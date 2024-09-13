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
    host: "".concat(proxyParsed[0]).concat(proxyParsed[1]),
    port: Number(proxyParsed[2]),
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9zdGFydHVwL2JvdGgvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXIvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL3Bvd2VyYm94LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWFpbi5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJsaW5rIiwiTWV0ZW9yIiwidiIsImhlYWRlcnMiLCJodHRwIiwiZGVmYXVsdCIsImFjY2Vzc1Rva2VuIiwic2Vzc2lvbklkIiwidXJsUmVnZXgiLCJpc1NlcnZlciIsIm1ldGhvZHMiLCJjbGFpbVRva2VuIiwic2VsZiIsImNvbnNvbGUiLCJsb2ciLCJnZXQiLCJnZXRBY2Nlc3NUb2tlbiIsInByb3h5UGFyc2VkIiwicHJvY2VzcyIsImVudiIsIkhUVFBfUFJPWFkiLCJtYXRjaCIsInJlcXVlc3REYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlc0RhdGEiLCJvcHRpb25zIiwiaG9zdCIsInBvcnQiLCJOdW1iZXIiLCJtZXRob2QiLCJwYXRoIiwicmVxIiwicmVxdWVzdCIsInJlcyIsInNldEVuY29kaW5nIiwib24iLCJlcnJvciIsImNodW5rIiwiY2FwIiwid3JpdGUiLCJlbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQSx3Qzs7Ozs7Ozs7Ozs7QUNEQUEsTUFBTSxDQUFDQyxJQUFQLENBQVksdUJBQVo7QUFBcUNELE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLHlCQUFaO0FBQXVDRCxNQUFNLENBQUNDLElBQVAsQ0FBWSx1QkFBWixFOzs7Ozs7Ozs7OztBQ0E1RSxJQUFJQyxNQUFKO0FBQVdGLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLGVBQVosRUFBNEI7QUFBQ0MsUUFBTSxDQUFDQyxDQUFELEVBQUc7QUFBQ0QsVUFBTSxHQUFDQyxDQUFQO0FBQVM7O0FBQXBCLENBQTVCLEVBQWtELENBQWxEO0FBQXFE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LENBQVksdUJBQVosRSIsImZpbGUiOiIvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0IG1vZHVsZXMgdXNlZCBieSBib3RoIGNsaWVudCBhbmQgc2VydmVyIHRocm91Z2ggYSBzaW5nbGUgaW5kZXggZW50cnkgcG9pbnRcbi8vIGUuZy4gdXNlcmFjY291bnRzIGNvbmZpZ3VyYXRpb24gZmlsZS5cbiIsIi8vIEltcG9ydCBzZXJ2ZXIgc3RhcnR1cCB0aHJvdWdoIGEgc2luZ2xlIGluZGV4IGVudHJ5IHBvaW50XG5cbmltcG9ydCAnL2ltcG9ydHMvc3RhcnR1cC9ib3RoJztcbmltcG9ydCAnL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXInO1xuaW1wb3J0ICcvaW1wb3J0cy9hcGkvcG93ZXJib3gnOyIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IHsgaGVhZGVycyB9IGZyb20gJ21ldGVvci9nYWRpY29oZW46aGVhZGVycyc7XG5pbXBvcnQgaHR0cCBmcm9tICdodHRwJztcblxudmFyIGFjY2Vzc1Rva2VuO1xudmFyIHNlc3Npb25JZDtcbmNvbnN0IHVybFJlZ2V4ID0gLyhbYS16MC05XSspOlxcL1xcLyhbYS16MC05XFwuXSspOihbXFxkXSspLztcblxuaWYgKE1ldGVvci5pc1NlcnZlcikge1xuXHRNZXRlb3IubWV0aG9kcyh7XG5cdFx0XCJzYW5kc3Rvcm0uc3VibWl0Q2xhaW1Ub2tlblwiKGNsYWltVG9rZW4pIHtcblx0XHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXHRcdFx0Y29uc29sZS5sb2coYGNsYWltVG9rZW4gPSAke2NsYWltVG9rZW59YCk7XG5cdFx0XHRzZXNzaW9uSWQgPSBoZWFkZXJzLmdldChzZWxmLCAneC1zYW5kc3Rvcm0tc2Vzc2lvbi1pZCcpO1xuXHRcdFx0Y29uc29sZS5sb2coYHNlc3Npb25JZCA9ICR7c2Vzc2lvbklkfWApO1xuXHRcdFx0aWYgKE1ldGVvci5pc1NlcnZlcikge1xuXHRcdFx0XHRnZXRBY2Nlc3NUb2tlbihjbGFpbVRva2VuKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdnZXR0aW5nIGFjY2VzcyB0b2tlbicpXG5cdFx0XHR9XG5cdFx0fVxuXHR9KVxufVxuXG5mdW5jdGlvbiBnZXRBY2Nlc3NUb2tlbihjbGFpbVRva2VuKSB7XG5cdGNvbnN0IHByb3h5UGFyc2VkID0gcHJvY2Vzcy5lbnYuSFRUUF9QUk9YWS5tYXRjaCh1cmxSZWdleCk7XG5cdGNvbnN0IHJlcXVlc3REYXRhID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFwicmVxdWVzdFRva2VuXCI6IGNsYWltVG9rZW4sXG5cdFx0XCJyZXF1aXJlZFBlcm1pc3Npb25zXCI6IFtdLFxuXHR9KTtcblx0dmFyIHJlc0RhdGEgPSBcIlwiO1xuXHRjb25zdCBvcHRpb25zID0ge1xuXHRcdGhvc3Q6IGAke3Byb3h5UGFyc2VkWzBdfSR7cHJveHlQYXJzZWRbMV19YCxcblx0XHRwb3J0OiBOdW1iZXIocHJveHlQYXJzZWRbMl0pLFxuXHRcdG1ldGhvZDogXCJQT1NUXCIsXG5cdFx0cGF0aDogYC9odHRwLWJyaWRnZS9zZXNzaW9uLyR7c2Vzc2lvbklkfS9jbGFpbWAsXG5cdH07XG5cdGNvbnNvbGUubG9nKCdnZXRBY2Nlc3NUb2tlbjogJyArIGNsYWltVG9rZW4pXG5cdGNvbnNvbGUubG9nKG9wdGlvbnMpO1xuXHRjb25zdCByZXEgPSBodHRwLnJlcXVlc3Qob3B0aW9ucywgZnVuY3Rpb24ocmVzKSB7XG5cdFx0cmVzLnNldEVuY29kaW5nKCd1dGY4Jyk7XG5cdFx0cmVzLm9uKCdlcnJvcicsIGZ1bmN0aW9uKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdFx0fSk7XG5cdFx0cmVzLm9uKCdkYXRhJywgZnVuY3Rpb24gKGNodW5rKSB7XG5cdFx0XHRyZXNEYXRhID0gcmVzRGF0YSArIGNodW5rO1xuXHRcdH0pO1xuXHRcdHJlcy5vbignZW5kJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0Y29uc29sZS5sb2cocmVzRGF0YSk7XG5cdFx0XHRhY2Nlc3NUb2tlbiA9IHJlc0RhdGEuY2FwO1xuXHRcdH0pXG5cdH0pXG5cblx0cmVxLndyaXRlKHJlcXVlc3REYXRhKTtcblx0cmVxLmVuZCgpO1xufSIsIi8vIFNlcnZlciBlbnRyeSBwb2ludCwgaW1wb3J0cyBhbGwgc2VydmVyIGNvZGVcblxuaW1wb3J0ICcvaW1wb3J0cy9zdGFydHVwL3NlcnZlcic7XG5pbXBvcnQgJy9pbXBvcnRzL3N0YXJ0dXAvYm90aCc7XG4iXX0=
