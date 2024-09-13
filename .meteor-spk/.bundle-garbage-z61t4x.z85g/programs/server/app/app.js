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
      console.log(headers.get(self));

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
  const requestData = JSON.stringify({
    "requestToken": claimToken,
    "requiredPermissions": []
  });
  var resData = "";
  const options = {
    protocol: 'http:',
    host: proxyParsed[2],
    port: Number(proxyParsed[3]),
    method: "POST",
    path: "/http-bridge/session/".concat(sessionId, "/claim")
  };
  console.log('getAccessToken: ' + claimToken);
  console.log(options);
  const req = http.request(options, function (res) {
    res.setEncoding('utf8');
    res.on('error', function (error) {
      console.log("Error"); //console.log(error);
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
  console.log('end');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9zdGFydHVwL2JvdGgvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXIvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL3Bvd2VyYm94LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWFpbi5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJsaW5rIiwiTWV0ZW9yIiwidiIsImhlYWRlcnMiLCJodHRwIiwiZGVmYXVsdCIsImFjY2Vzc1Rva2VuIiwic2Vzc2lvbklkIiwidXJsUmVnZXgiLCJpc1NlcnZlciIsIm1ldGhvZHMiLCJjbGFpbVRva2VuIiwic2VsZiIsImNvbnNvbGUiLCJsb2ciLCJnZXQiLCJnZXRBY2Nlc3NUb2tlbiIsInByb3h5UGFyc2VkIiwicHJvY2VzcyIsImVudiIsIkhUVFBfUFJPWFkiLCJtYXRjaCIsInJlcXVlc3REYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlc0RhdGEiLCJvcHRpb25zIiwicHJvdG9jb2wiLCJob3N0IiwicG9ydCIsIk51bWJlciIsIm1ldGhvZCIsInBhdGgiLCJyZXEiLCJyZXF1ZXN0IiwicmVzIiwic2V0RW5jb2RpbmciLCJvbiIsImVycm9yIiwiY2h1bmsiLCJjYXAiLCJ3cml0ZSIsImVuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBLHdDOzs7Ozs7Ozs7OztBQ0RBQSxNQUFNLENBQUNDLElBQVAsQ0FBWSx1QkFBWjtBQUFxQ0QsTUFBTSxDQUFDQyxJQUFQLENBQVkseUJBQVo7QUFBdUNELE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLHVCQUFaLEU7Ozs7Ozs7Ozs7O0FDQTVFLElBQUlDLE1BQUo7QUFBV0YsTUFBTSxDQUFDQyxJQUFQLENBQVksZUFBWixFQUE0QjtBQUFDQyxRQUFNLENBQUNDLENBQUQsRUFBRztBQUFDRCxVQUFNLEdBQUNDLENBQVA7QUFBUzs7QUFBcEIsQ0FBNUIsRUFBa0Qs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QixTQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFaO0FBQ0EsQzs7Ozs7Ozs7Ozs7QUMzRERmLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLHlCQUFaO0FBQXVDRCxNQUFNLENBQUNDLElBQVAsQ0FBWSx1QkFBWixFIiwiZmlsZSI6Ii9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnQgbW9kdWxlcyB1c2VkIGJ5IGJvdGggY2xpZW50IGFuZCBzZXJ2ZXIgdGhyb3VnaCBhIHNpbmdsZSBpbmRleCBlbnRyeSBwb2ludFxuLy8gZS5nLiB1c2VyYWNjb3VudHMgY29uZmlndXJhdGlvbiBmaWxlLlxuIiwiLy8gSW1wb3J0IHNlcnZlciBzdGFydHVwIHRocm91Z2ggYSBzaW5nbGUgaW5kZXggZW50cnkgcG9pbnRcblxuaW1wb3J0ICcvaW1wb3J0cy9zdGFydHVwL2JvdGgnO1xuaW1wb3J0ICcvaW1wb3J0cy9zdGFydHVwL3NlcnZlcic7XG5pbXBvcnQgJy9pbXBvcnRzL2FwaS9wb3dlcmJveCc7IiwiaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSAnbWV0ZW9yL2dhZGljb2hlbjpoZWFkZXJzJztcbmltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xuXG52YXIgYWNjZXNzVG9rZW47XG52YXIgc2Vzc2lvbklkO1xuY29uc3QgdXJsUmVnZXggPSAvKFthLXowLTldKyk6XFwvXFwvKFthLXowLTlcXC5dKyk6KFtcXGRdKykvO1xuXG5pZiAoTWV0ZW9yLmlzU2VydmVyKSB7XG5cdE1ldGVvci5tZXRob2RzKHtcblx0XHRcInNhbmRzdG9ybS5zdWJtaXRDbGFpbVRva2VuXCIoY2xhaW1Ub2tlbikge1xuXHRcdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0XHRjb25zb2xlLmxvZyhgY2xhaW1Ub2tlbiA9ICR7Y2xhaW1Ub2tlbn1gKTtcblx0XHRcdHNlc3Npb25JZCA9IGhlYWRlcnMuZ2V0KHNlbGYsICd4LXNhbmRzdG9ybS1zZXNzaW9uLWlkJyk7XG5cdFx0XHRjb25zb2xlLmxvZyhgc2Vzc2lvbklkID0gJHtzZXNzaW9uSWR9YCk7XG5cdFx0XHRjb25zb2xlLmxvZyhoZWFkZXJzLmdldChzZWxmKSk7XG5cdFx0XHRpZiAoTWV0ZW9yLmlzU2VydmVyKSB7XG5cdFx0XHRcdGdldEFjY2Vzc1Rva2VuKGNsYWltVG9rZW4pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2dldHRpbmcgYWNjZXNzIHRva2VuJylcblx0XHRcdH1cblx0XHR9XG5cdH0pXG59XG5cbmZ1bmN0aW9uIGdldEFjY2Vzc1Rva2VuKGNsYWltVG9rZW4pIHtcblx0Y29uc3QgcHJveHlQYXJzZWQgPSBwcm9jZXNzLmVudi5IVFRQX1BST1hZLm1hdGNoKHVybFJlZ2V4KTtcblx0Y29uc3QgcmVxdWVzdERhdGEgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XCJyZXF1ZXN0VG9rZW5cIjogY2xhaW1Ub2tlbixcblx0XHRcInJlcXVpcmVkUGVybWlzc2lvbnNcIjogW10sXG5cdH0pO1xuXHR2YXIgcmVzRGF0YSA9IFwiXCI7XG5cdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0cHJvdG9jb2w6ICdodHRwOicsXG5cdFx0aG9zdDogcHJveHlQYXJzZWRbMl0sXG5cdFx0cG9ydDogTnVtYmVyKHByb3h5UGFyc2VkWzNdKSxcblx0XHRtZXRob2Q6IFwiUE9TVFwiLFxuXHRcdHBhdGg6IGAvaHR0cC1icmlkZ2Uvc2Vzc2lvbi8ke3Nlc3Npb25JZH0vY2xhaW1gLFxuXHR9O1xuXHRjb25zb2xlLmxvZygnZ2V0QWNjZXNzVG9rZW46ICcgKyBjbGFpbVRva2VuKVxuXHRjb25zb2xlLmxvZyhvcHRpb25zKTtcblx0Y29uc3QgcmVxID0gaHR0cC5yZXF1ZXN0KG9wdGlvbnMsIGZ1bmN0aW9uKHJlcykge1xuXHRcdHJlcy5zZXRFbmNvZGluZygndXRmOCcpO1xuXHRcdHJlcy5vbignZXJyb3InLCBmdW5jdGlvbihlcnJvcikge1xuXHRcdFx0Y29uc29sZS5sb2coXCJFcnJvclwiKTtcblx0XHRcdC8vY29uc29sZS5sb2coZXJyb3IpO1xuXHRcdH0pO1xuXHRcdHJlcy5vbignZGF0YScsIGZ1bmN0aW9uIChjaHVuaykge1xuXHRcdFx0cmVzRGF0YSA9IHJlc0RhdGEgKyBjaHVuaztcblx0XHR9KTtcblx0XHRyZXMub24oJ2VuZCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdGNvbnNvbGUubG9nKHJlc0RhdGEpO1xuXHRcdFx0YWNjZXNzVG9rZW4gPSByZXNEYXRhLmNhcDtcblx0XHR9KVxuXHR9KVxuXG5cdHJlcS53cml0ZShyZXF1ZXN0RGF0YSk7XG5cdHJlcS5lbmQoKTtcblx0Y29uc29sZS5sb2coJ2VuZCcpO1xufSIsIi8vIFNlcnZlciBlbnRyeSBwb2ludCwgaW1wb3J0cyBhbGwgc2VydmVyIGNvZGVcblxuaW1wb3J0ICcvaW1wb3J0cy9zdGFydHVwL3NlcnZlcic7XG5pbXBvcnQgJy9pbXBvcnRzL3N0YXJ0dXAvYm90aCc7XG4iXX0=
