var require = meteorInstall({"imports":{"startup":{"both":{"index.js":function module(){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// imports/startup/both/index.js                                                    //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
// Import modules used by both client and server through a single index entry point
// e.g. useraccounts configuration file.
//////////////////////////////////////////////////////////////////////////////////////

}},"server":{"index.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// imports/startup/server/index.js                                                  //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
module.link("/imports/startup/both");
module.link("/imports/startup/server");
module.link("/imports/api/powerbox");
//////////////////////////////////////////////////////////////////////////////////////

}}},"api":{"powerbox.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// imports/api/powerbox.js                                                          //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let headers;
module.link("meteor/gadicohen:headers", {
  headers(v) {
    headers = v;
  }

}, 1);
let http;
module.link("http", {
  default(v) {
    http = v;
  }

}, 2);
var accessToken;
var sessionId;
const urlRegex = /([a-z0-9]+):\/\/([a-z0-9\.]+):([\d]+)/;

if (Meteor.isServer) {
  Meteor.methods({
    "sandstorm.submitClaimToken"(claimToken) {
      const self = this;
      console.log("claimToken = ".concat(claimToken));
      sessionId = headers.get(self, 'x-sandstorm-session-id');
      console.log("sessionId = ".concat(sessionId));

      if (Meteor.isServer) {
        getAccessToken(claimToken);
      } else {
        console.log('getting access token');
      }
    }

  });
}

function getAccessToken(claimToken) {
  const proxyParsed = process.env.HTTP_PROXY.match(urlRegex);
  const requestData = Json.stringify({
    "requestToken": claimToken,
    "requiredPermissions": []
  });
  var resData = "";
  const options = {
    host: "".concat(proxyParsed[0]).concat(proxyParsed[1]),
    port: Number(proxyParsed[2]),
    method: "POST",
    path: "http://http-bridge/session/".concat(sessionId, "/claim")
  };
  const req = http.request(options, function (res) {
    res.setEncoding('utf8');
    res.on('error', function (error) {
      console.log(error);
    });
    res.on('data', function (chunk) {
      resData = resData + chunk;
    });
    res.on('end', function () {
      console.log(resData);
      accessToken = resData.cap;
    });
  });
  req.write(requestData);
  req.end();
}
//////////////////////////////////////////////////////////////////////////////////////

}}},"server":{"main.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// server/main.js                                                                   //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
module.link("/imports/startup/server");
module.link("/imports/startup/both");
//////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".ts",
    ".mjs"
  ]
});

require("/server/main.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9zdGFydHVwL2JvdGgvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXIvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL3Bvd2VyYm94LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWFpbi5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJsaW5rIiwiTWV0ZW9yIiwidiIsImhlYWRlcnMiLCJodHRwIiwiZGVmYXVsdCIsImFjY2Vzc1Rva2VuIiwic2Vzc2lvbklkIiwidXJsUmVnZXgiLCJpc1NlcnZlciIsIm1ldGhvZHMiLCJjbGFpbVRva2VuIiwic2VsZiIsImNvbnNvbGUiLCJsb2ciLCJnZXQiLCJnZXRBY2Nlc3NUb2tlbiIsInByb3h5UGFyc2VkIiwicHJvY2VzcyIsImVudiIsIkhUVFBfUFJPWFkiLCJtYXRjaCIsInJlcXVlc3REYXRhIiwiSnNvbiIsInN0cmluZ2lmeSIsInJlc0RhdGEiLCJvcHRpb25zIiwiaG9zdCIsInBvcnQiLCJOdW1iZXIiLCJtZXRob2QiLCJwYXRoIiwicmVxIiwicmVxdWVzdCIsInJlcyIsInNldEVuY29kaW5nIiwib24iLCJlcnJvciIsImNodW5rIiwiY2FwIiwid3JpdGUiLCJlbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQSx3Qzs7Ozs7Ozs7Ozs7QUNEQUEsTUFBTSxDQUFDQyxJQUFQLENBQVksdUJBQVo7QUFBcUNELE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLHlCQUFaO0FBQXVDRCxNQUFNLENBQUNDLElBQVAsQ0FBWSx1QkFBWixFOzs7Ozs7Ozs7OztBQ0E1RSxJQUFJQyxNQUFKO0FBQVdGLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLGVBQVosRUFBNEI7QUFBQ0MsUUFBTSxDQUFDQyxDQUFELEVBQUc7QUFBQ0QsVUFBTSxHQUFDQyxDQUFQO0FBQVM7O0FBQXBCLENBQTVCLEVBQWtELENBQWxEO0FBQXFE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IGJ5IGJvdGggY2xpZW50IGFuZCBzZXJ2ZXIgdGhyb3VnaCBhIHNpbmdsZSBpbmRleCBlbnRyeSBwb2ludFxuLy8gZS5nLiB1c2VyYWNjb3VudHMgY29uZmlndXJhdGlvbiBmaWxlLlxuIiwiLy8gSW1wb3J0IHNlcnZlciBzdGFydHVwIHRocm91Z2ggYSBzaW5nbGUgaW5kZXggZW50cnkgcG9pbnRcblxuaW1wb3J0ICcvaW1wb3J0cy9zdGFydHVwL2JvdGgnO1xuaW1wb3J0ICcvaW1wb3J0cy9zdGFydHVwL3NlcnZlcic7XG5pbXBvcnQgJy9pbXBvcnRzL2FwaS9wb3dlcmJveCc7IiwiaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSAnbWV0ZW9yL2dhZGljb2hlbjpoZWFkZXJzJztcbmltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xuXG52YXIgYWNjZXNzVG9rZW47XG52YXIgc2Vzc2lvbklkO1xuY29uc3QgdXJsUmVnZXggPSAvKFthLXowLTldKyk6XFwvXFwvKFthLXowLTlcXC5dKyk6KFtcXGRdKykvO1xuXG5pZiAoTWV0ZW9yLmlzU2VydmVyKSB7XG5cdE1ldGVvci5tZXRob2RzKHtcblx0XHRcInNhbmRzdG9ybS5zdWJtaXRDbGFpbVRva2VuXCIoY2xhaW1Ub2tlbikge1xuXHRcdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0XHRjb25zb2xlLmxvZyhgY2xhaW1Ub2tlbiA9ICR7Y2xhaW1Ub2tlbn1gKTtcblx0XHRcdHNlc3Npb25JZCA9IGhlYWRlcnMuZ2V0KHNlbGYsICd4LXNhbmRzdG9ybS1zZXNzaW9uLWlkJyk7XG5cdFx0XHRjb25zb2xlLmxvZyhgc2Vzc2lvbklkID0gJHtzZXNzaW9uSWR9YCk7XG5cdFx0XHRpZiAoTWV0ZW9yLmlzU2VydmVyKSB7XG5cdFx0XHRcdGdldEFjY2Vzc1Rva2VuKGNsYWltVG9rZW4pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2dldHRpbmcgYWNjZXNzIHRva2VuJylcblx0XHRcdH1cblx0XHR9XG5cdH0pXG59XG5cbmZ1bmN0aW9uIGdldEFjY2Vzc1Rva2VuKGNsYWltVG9rZW4pIHtcblx0Y29uc3QgcHJveHlQYXJzZWQgPSBwcm9jZXNzLmVudi5IVFRQX1BST1hZLm1hdGNoKHVybFJlZ2V4KTtcblx0Y29uc3QgcmVxdWVzdERhdGEgPSBKc29uLnN0cmluZ2lmeSh7XG5cdFx0XCJyZXF1ZXN0VG9rZW5cIjogY2xhaW1Ub2tlbixcblx0XHRcInJlcXVpcmVkUGVybWlzc2lvbnNcIjogW10sXG5cdH0pO1xuXHR2YXIgcmVzRGF0YSA9IFwiXCI7XG5cdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0aG9zdDogYCR7cHJveHlQYXJzZWRbMF19JHtwcm94eVBhcnNlZFsxXX1gLFxuXHRcdHBvcnQ6IE51bWJlcihwcm94eVBhcnNlZFsyXSksXG5cdFx0bWV0aG9kOiBcIlBPU1RcIixcblx0XHRwYXRoOiBgaHR0cDovL2h0dHAtYnJpZGdlL3Nlc3Npb24vJHtzZXNzaW9uSWR9L2NsYWltYCxcblx0fTtcblx0Y29uc3QgcmVxID0gaHR0cC5yZXF1ZXN0KG9wdGlvbnMsIGZ1bmN0aW9uKHJlcykge1xuXHRcdHJlcy5zZXRFbmNvZGluZygndXRmOCcpO1xuXHRcdHJlcy5vbignZXJyb3InLCBmdW5jdGlvbihlcnJvcikge1xuXHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHRcdH0pO1xuXHRcdHJlcy5vbignZGF0YScsIGZ1bmN0aW9uIChjaHVuaykge1xuXHRcdFx0cmVzRGF0YSA9IHJlc0RhdGEgKyBjaHVuaztcblx0XHR9KTtcblx0XHRyZXMub24oJ2VuZCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdGNvbnNvbGUubG9nKHJlc0RhdGEpO1xuXHRcdFx0YWNjZXNzVG9rZW4gPSByZXNEYXRhLmNhcDtcblx0XHR9KVxuXHR9KVxuXG5cdHJlcS53cml0ZShyZXF1ZXN0RGF0YSk7XG5cdHJlcS5lbmQoKTtcbn0iLCIvLyBTZXJ2ZXIgZW50cnkgcG9pbnQsIGltcG9ydHMgYWxsIHNlcnZlciBjb2RlXG5cbmltcG9ydCAnL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXInO1xuaW1wb3J0ICcvaW1wb3J0cy9zdGFydHVwL2JvdGgnO1xuIl19
