// Copyright (c) 2014 Sandstorm Development Group, Inc. and contributors
// Licensed under the MIT License:
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

// Application start script. This launches Mongo, then delegates to main.js.
// meteor-spk will automatically include this in your package; you don't need
// to worry about it.
//
// The original version of meteor-spk used Niscu[1], a fork of Mongo that adjusts
// some compiled-in constants to optimize for a small disk footprint. As of Mongo 3.0,
// we no longer need Niscu, because the WiredTiger storage engine can be configured
// to suit our needs. This script performs the migration from Niscu to Mongo 3.0,
// if necessary.
//
// [1] https://github.com/kentonv/mongo/tree/niscu

var child_process = require("child_process");
var fs = require("fs");
var Promise = require("es6-promise").Promise;
var MongoClient = require('mongodb').MongoClient;

var appPort = "4000";
var mongoPort = "4001";
var niscuPort = "4002";
if (process.argv.length > 3) {
  // You can pass in a port number for the app to listen on:
  // `node start.js -p <port number>`
  if (process.argv[2] !== "-p") {
    throw new Error("-p is the only option currently supported");
  }
  var appPortNum = parseInt(process.argv[3]);
  if (isNaN(appPortNum)) {
    throw new Error("could not parse a port number from: " + process.argv[2]);
  }
  appPort = appPortNum.toString();
  mongoPort = (appPortNum + 1).toString();
  niscuPort = (appPortNum + 2).toString();
}

var dbPath = "/var/wiredTigerDb"

function runChildProcess(child, name, continuation) {
// Runs the process until it exits successfully. Then calls the continuation.
  child.on("error", function (err) {
    console.error("error in " + name + ": "  + err.stack);
    process.exit(1);
  });

  child.on("exit", function (code, signal) {
    if (signal) {
      console.error(name + " failed with signal: " + signal);
      process.exit(1);
    }
    if (code !== 0) {
      console.error(name + " exited with error code: " + code);
      process.exit(1);
    }
    continuation();
  });
}

function startMongo(continuation) {
  console.log("** Starting Mongo...");
  var db = child_process.spawn("/bin/mongod",
                               [ "--fork", "--port", mongoPort, "--dbpath", dbPath,
                                 "--noauth", "--bind_ip", "127.0.0.1",
                                 "--storageEngine", "wiredTiger",
                                 "--wiredTigerEngineConfigString",
                                 "log=(prealloc=false,file_max=200KB)",
                                 "--wiredTigerCacheSizeGB", "1",
                                 "--logpath", dbPath + "/mongo.log" ],
                               { stdio: "inherit" });

  runChildProcess(db, "Mongo", continuation);
}

function runApp() {
  console.log("** Starting Meteor...");
  process.env.MONGO_URL="mongodb://127.0.0.1:" + mongoPort + "/meteor";
  process.env.ROOT_URL="http://127.0.0.1:" + appPort;
  process.env.PORT=appPort;
  require("./main.js");
}

var migrationDumpPath = "/var/migrationMongoDump";
// Back when we used mongodump for migration, this was a directory containing the dumped data.
// Now it's just an empty file, the existence of which implies that a migration is in progress.

if (fs.existsSync(dbPath) && !fs.existsSync(migrationDumpPath)) {
  startMongo(runApp);
} else {
  // The old database was in /var.
  if (!fs.existsSync("/var/journal")) {
    // No migration required.
    fs.mkdirSync(dbPath);
    startMongo(runApp);
  } else {
    console.log("Starting migration to WiredTiger storage engine...");

    if (fs.existsSync(migrationDumpPath)) {
      console.log("It looks like a previous attempt to migrate failed. Cleaning it up...");
      var now = (new Date()).getTime();
      if (fs.existsSync(dbPath)) {
        fs.renameSync(dbPath, "/var/failedMigration" + now);
      }
      fs.renameSync(migrationDumpPath, "/var/failedMigrationDump" + now);
      // Can't just call unlinkSync() because it might be a directory with mongodump contents.
    }
    fs.writeFileSync(migrationDumpPath, "");

    console.log("launching niscud");
    var oldDbProcess = child_process.spawn("/bin/niscud", [ "--fork",
                                                            "--port", niscuPort,
                                                            "--dbpath", "/var",
                                                            "--noauth", "--bind_ip", "127.0.0.1",
                                                            "--nohttpinterface", "--noprealloc",
                                                            "--logpath", "/var/mongo.log" ], {
                                                              stdio: "inherit"
                                                            });
    fs.mkdirSync(dbPath);
    runChildProcess(oldDbProcess, "nisucd", function () {
      startMongo(function () {
        var niscuUrl = "mongodb://127.0.0.1:" + niscuPort + "/meteor";
        var mongoUrl = "mongodb://127.0.0.1:" + mongoPort + "/meteor";

        // After `mongod --fork` returns, we still need to wait a bit before mongod is listening. :(
        var waitForListen = new Promise(function (resolve, reject) {
          setTimeout(function() { resolve(); }, 1000);
        });
        waitForListen.then(function() {
          return MongoClient.connect(niscuUrl, {}).then(function(oldDb) {
            return MongoClient.connect(mongoUrl, {}).then(function(newDb) {
              return {oldDb: oldDb, newDb: newDb};
            });
          });
        }).then(function (dbs) {
          return dbs.oldDb.collections().then(function (oldCollections) {
            var collectionPromises = [];
            oldCollections.forEach(function(oldCollection) {
              console.log("collection: " + oldCollection.collectionName);
              if (oldCollection.collectionName.slice(0, 7)  === "system.") {
                // Ignore system.indexes and other special collections.
                // If the app uses createIndex() or ensureIndex() sensibly, the indexes
                // should be regenerated on the next start of the app.
                return;
              }
              var promise = dbs.newDb.createCollection(oldCollection.collectionName)
                  .then(function (newCollection) {
                function insertionLoop(cursor) {
                  return cursor.hasNext().then(function (hasNext) {
                    if (hasNext) {
                      return cursor.next().then(function (doc) {
                        return newCollection.insertOne(doc).then(function () {
                          return insertionLoop(cursor);
                        });
                      });
                    }
                  });
                }
                return insertionLoop(oldCollection.find());
              });
              collectionPromises.push(promise);
            });
            return Promise.all(collectionPromises).then(function () {
              dbs.oldDb.admin().command({shutdown: 1});
              // We don't wait for success of this command because the server kills itself
              // before it sends a confirmation.

              fs.unlinkSync(migrationDumpPath);
              // Success!

              runApp();
            });
          });
        }).catch(function(e) {
          console.log("error: " + e);
        });
      });
    });
  }
}
