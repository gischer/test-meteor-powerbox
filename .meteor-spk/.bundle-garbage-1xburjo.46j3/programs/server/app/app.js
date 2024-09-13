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
  const requestData = JSON.stringify({
    "requestToken": claimToken,
    "requiredPermissions": []
  });
  var resData = "";
  const options = {
    protocol: proxyParsed[1],
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9zdGFydHVwL2JvdGgvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXIvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL3Bvd2VyYm94LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWFpbi5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJsaW5rIiwiTWV0ZW9yIiwidiIsImhlYWRlcnMiLCJodHRwIiwiZGVmYXVsdCIsImFjY2Vzc1Rva2VuIiwic2Vzc2lvbklkIiwidXJsUmVnZXgiLCJpc1NlcnZlciIsIm1ldGhvZHMiLCJjbGFpbVRva2VuIiwic2VsZiIsImNvbnNvbGUiLCJsb2ciLCJnZXQiLCJnZXRBY2Nlc3NUb2tlbiIsInByb3h5UGFyc2VkIiwicHJvY2VzcyIsImVudiIsIkhUVFBfUFJPWFkiLCJtYXRjaCIsInJlcXVlc3REYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlc0RhdGEiLCJvcHRpb25zIiwicHJvdG9jb2wiLCJob3N0IiwicG9ydCIsIk51bWJlciIsIm1ldGhvZCIsInBhdGgiLCJyZXEiLCJyZXF1ZXN0IiwicmVzIiwic2V0RW5jb2RpbmciLCJvbiIsImVycm9yIiwiY2h1bmsiLCJjYXAiLCJ3cml0ZSIsImVuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBLHdDOzs7Ozs7Ozs7OztBQ0RBQSxNQUFNLENBQUNDLElBQVAsQ0FBWSx1QkFBWjtBQUFxQ0QsTUFBTSxDQUFDQyxJQUFQLENBQVkseUJBQVo7QUFBdUNELE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLHVCQUFaLEU7Ozs7Ozs7Ozs7O0FDQTVFLElBQUlDLE1BQUo7QUFBV0YsTUFBTSxDQUFDQyxJQUFQLENBQVksZUFBWixFQUE0QjtBQUFDQyxRQUFNLENBQUNDLENBQUQsRUFBRztBQUFDRCxVQUFNLEdBQUNDLENBQVA7QUFBUzs7QUFBcEIsQ0FBNUIsRUFBa0Qs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QUFNLENBQUNDLElBQVAsQ0FBWSx1QkFBWixFIiwiZmlsZSI6Ii9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnQgbW9kdWxlcyB1c2VkIGJ5IGJvdGggY2xpZW50IGFuZCBzZXJ2ZXIgdGhyb3VnaCBhIHNpbmdsZSBpbmRleCBlbnRyeSBwb2ludFxuLy8gZS5nLiB1c2VyYWNjb3VudHMgY29uZmlndXJhdGlvbiBmaWxlLlxuIiwiLy8gSW1wb3J0IHNlcnZlciBzdGFydHVwIHRocm91Z2ggYSBzaW5nbGUgaW5kZXggZW50cnkgcG9pbnRcblxuaW1wb3J0ICcvaW1wb3J0cy9zdGFydHVwL2JvdGgnO1xuaW1wb3J0ICcvaW1wb3J0cy9zdGFydHVwL3NlcnZlcic7XG5pbXBvcnQgJy9pbXBvcnRzL2FwaS9wb3dlcmJveCc7IiwiaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSAnbWV0ZW9yL2dhZGljb2hlbjpoZWFkZXJzJztcbmltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xuXG52YXIgYWNjZXNzVG9rZW47XG52YXIgc2Vzc2lvbklkO1xuY29uc3QgdXJsUmVnZXggPSAvKFthLXowLTldKyk6XFwvXFwvKFthLXowLTlcXC5dKyk6KFtcXGRdKykvO1xuXG5pZiAoTWV0ZW9yLmlzU2VydmVyKSB7XG5cdE1ldGVvci5tZXRob2RzKHtcblx0XHRcInNhbmRzdG9ybS5zdWJtaXRDbGFpbVRva2VuXCIoY2xhaW1Ub2tlbikge1xuXHRcdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0XHRjb25zb2xlLmxvZyhgY2xhaW1Ub2tlbiA9ICR7Y2xhaW1Ub2tlbn1gKTtcblx0XHRcdHNlc3Npb25JZCA9IGhlYWRlcnMuZ2V0KHNlbGYsICd4LXNhbmRzdG9ybS1zZXNzaW9uLWlkJyk7XG5cdFx0XHRjb25zb2xlLmxvZyhgc2Vzc2lvbklkID0gJHtzZXNzaW9uSWR9YCk7XG5cdFx0XHRpZiAoTWV0ZW9yLmlzU2VydmVyKSB7XG5cdFx0XHRcdGdldEFjY2Vzc1Rva2VuKGNsYWltVG9rZW4pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2dldHRpbmcgYWNjZXNzIHRva2VuJylcblx0XHRcdH1cblx0XHR9XG5cdH0pXG59XG5cbmZ1bmN0aW9uIGdldEFjY2Vzc1Rva2VuKGNsYWltVG9rZW4pIHtcblx0Y29uc3QgcHJveHlQYXJzZWQgPSBwcm9jZXNzLmVudi5IVFRQX1BST1hZLm1hdGNoKHVybFJlZ2V4KTtcblx0Y29uc3QgcmVxdWVzdERhdGEgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XCJyZXF1ZXN0VG9rZW5cIjogY2xhaW1Ub2tlbixcblx0XHRcInJlcXVpcmVkUGVybWlzc2lvbnNcIjogW10sXG5cdH0pO1xuXHR2YXIgcmVzRGF0YSA9IFwiXCI7XG5cdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0cHJvdG9jb2w6IHByb3h5UGFyc2VkWzFdLFxuXHRcdGhvc3Q6IHByb3h5UGFyc2VkWzJdLFxuXHRcdHBvcnQ6IE51bWJlcihwcm94eVBhcnNlZFszXSksXG5cdFx0bWV0aG9kOiBcIlBPU1RcIixcblx0XHRwYXRoOiBgL2h0dHAtYnJpZGdlL3Nlc3Npb24vJHtzZXNzaW9uSWR9L2NsYWltYCxcblx0fTtcblx0Y29uc29sZS5sb2coJ2dldEFjY2Vzc1Rva2VuOiAnICsgY2xhaW1Ub2tlbilcblx0Y29uc29sZS5sb2cob3B0aW9ucyk7XG5cdGNvbnN0IHJlcSA9IGh0dHAucmVxdWVzdChvcHRpb25zLCBmdW5jdGlvbihyZXMpIHtcblx0XHRyZXMuc2V0RW5jb2RpbmcoJ3V0ZjgnKTtcblx0XHRyZXMub24oJ2Vycm9yJywgZnVuY3Rpb24oZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUubG9nKGVycm9yKTtcblx0XHR9KTtcblx0XHRyZXMub24oJ2RhdGEnLCBmdW5jdGlvbiAoY2h1bmspIHtcblx0XHRcdHJlc0RhdGEgPSByZXNEYXRhICsgY2h1bms7XG5cdFx0fSk7XG5cdFx0cmVzLm9uKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNEYXRhKTtcblx0XHRcdGFjY2Vzc1Rva2VuID0gcmVzRGF0YS5jYXA7XG5cdFx0fSlcblx0fSlcblxuXHRyZXEud3JpdGUocmVxdWVzdERhdGEpO1xuXHRyZXEuZW5kKCk7XG59IiwiLy8gU2VydmVyIGVudHJ5IHBvaW50LCBpbXBvcnRzIGFsbCBzZXJ2ZXIgY29kZVxuXG5pbXBvcnQgJy9pbXBvcnRzL3N0YXJ0dXAvc2VydmVyJztcbmltcG9ydCAnL2ltcG9ydHMvc3RhcnR1cC9ib3RoJztcbiJdfQ==
