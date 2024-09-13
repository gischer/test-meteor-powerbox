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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9zdGFydHVwL2JvdGgvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXIvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL3Bvd2VyYm94LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWFpbi5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJsaW5rIiwiTWV0ZW9yIiwidiIsImhlYWRlcnMiLCJodHRwIiwiZGVmYXVsdCIsImFjY2Vzc1Rva2VuIiwic2Vzc2lvbklkIiwidXJsUmVnZXgiLCJpc1NlcnZlciIsIm1ldGhvZHMiLCJjbGFpbVRva2VuIiwic2VsZiIsImNvbnNvbGUiLCJsb2ciLCJnZXQiLCJnZXRBY2Nlc3NUb2tlbiIsInByb3h5UGFyc2VkIiwicHJvY2VzcyIsImVudiIsIkhUVFBfUFJPWFkiLCJtYXRjaCIsInJlcXVlc3REYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlc0RhdGEiLCJvcHRpb25zIiwicHJvdG9jb2wiLCJob3N0IiwicG9ydCIsIk51bWJlciIsIm1ldGhvZCIsInBhdGgiLCJyZXEiLCJyZXF1ZXN0IiwicmVzIiwic2V0RW5jb2RpbmciLCJvbiIsImVycm9yIiwiY2h1bmsiLCJjYXAiLCJ3cml0ZSIsImVuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBLHdDOzs7Ozs7Ozs7OztBQ0RBQSxNQUFNLENBQUNDLElBQVAsQ0FBWSx1QkFBWjtBQUFxQ0QsTUFBTSxDQUFDQyxJQUFQLENBQVkseUJBQVo7QUFBdUNELE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLHVCQUFaLEU7Ozs7Ozs7Ozs7O0FDQTVFLElBQUlDLE1BQUo7QUFBV0YsTUFBTSxDQUFDQyxJQUFQLENBQVksZUFBWixFQUE0QjtBQUFDQyxRQUFNLENBQUNDLENBQUQsRUFBRztBQUFDRCxVQUFNLEdBQUNDLENBQVA7QUFBUzs7QUFBcEIsQ0FBNUIsRUFBa0Qs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QUFZLHVCQUFaLEUiLCJmaWxlIjoiL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEltcG9ydCBtb2R1bGVzIHVzZWQgYnkgYm90aCBjbGllbnQgYW5kIHNlcnZlciB0aHJvdWdoIGEgc2luZ2xlIGluZGV4IGVudHJ5IHBvaW50XG4vLyBlLmcuIHVzZXJhY2NvdW50cyBjb25maWd1cmF0aW9uIGZpbGUuXG4iLCIvLyBJbXBvcnQgc2VydmVyIHN0YXJ0dXAgdGhyb3VnaCBhIHNpbmdsZSBpbmRleCBlbnRyeSBwb2ludFxuXG5pbXBvcnQgJy9pbXBvcnRzL3N0YXJ0dXAvYm90aCc7XG5pbXBvcnQgJy9pbXBvcnRzL3N0YXJ0dXAvc2VydmVyJztcbmltcG9ydCAnL2ltcG9ydHMvYXBpL3Bvd2VyYm94JzsiLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tICdtZXRlb3IvbWV0ZW9yJztcbmltcG9ydCB7IGhlYWRlcnMgfSBmcm9tICdtZXRlb3IvZ2FkaWNvaGVuOmhlYWRlcnMnO1xuaW1wb3J0IGh0dHAgZnJvbSAnaHR0cCc7XG5cbnZhciBhY2Nlc3NUb2tlbjtcbnZhciBzZXNzaW9uSWQ7XG5jb25zdCB1cmxSZWdleCA9IC8oW2EtejAtOV0rKTpcXC9cXC8oW2EtejAtOVxcLl0rKTooW1xcZF0rKS87XG5cbmlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcblx0TWV0ZW9yLm1ldGhvZHMoe1xuXHRcdFwic2FuZHN0b3JtLnN1Ym1pdENsYWltVG9rZW5cIihjbGFpbVRva2VuKSB7XG5cdFx0XHRjb25zdCBzZWxmID0gdGhpcztcblx0XHRcdGNvbnNvbGUubG9nKGBjbGFpbVRva2VuID0gJHtjbGFpbVRva2VufWApO1xuXHRcdFx0c2Vzc2lvbklkID0gaGVhZGVycy5nZXQoc2VsZiwgJ3gtc2FuZHN0b3JtLXNlc3Npb24taWQnKTtcblx0XHRcdGNvbnNvbGUubG9nKGBzZXNzaW9uSWQgPSAke3Nlc3Npb25JZH1gKTtcblx0XHRcdGlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcblx0XHRcdFx0Z2V0QWNjZXNzVG9rZW4oY2xhaW1Ub2tlbik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnZ2V0dGluZyBhY2Nlc3MgdG9rZW4nKVxuXHRcdFx0fVxuXHRcdH1cblx0fSlcbn1cblxuZnVuY3Rpb24gZ2V0QWNjZXNzVG9rZW4oY2xhaW1Ub2tlbikge1xuXHRjb25zdCBwcm94eVBhcnNlZCA9IHByb2Nlc3MuZW52LkhUVFBfUFJPWFkubWF0Y2godXJsUmVnZXgpO1xuXHRjb25zdCByZXF1ZXN0RGF0YSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcInJlcXVlc3RUb2tlblwiOiBjbGFpbVRva2VuLFxuXHRcdFwicmVxdWlyZWRQZXJtaXNzaW9uc1wiOiBbXSxcblx0fSk7XG5cdHZhciByZXNEYXRhID0gXCJcIjtcblx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRwcm90b2NvbDogJ2h0dHA6Jyxcblx0XHRob3N0OiBwcm94eVBhcnNlZFsyXSxcblx0XHRwb3J0OiBOdW1iZXIocHJveHlQYXJzZWRbM10pLFxuXHRcdG1ldGhvZDogXCJQT1NUXCIsXG5cdFx0cGF0aDogYC9odHRwLWJyaWRnZS9zZXNzaW9uLyR7c2Vzc2lvbklkfS9jbGFpbWAsXG5cdH07XG5cdGNvbnNvbGUubG9nKCdnZXRBY2Nlc3NUb2tlbjogJyArIGNsYWltVG9rZW4pXG5cdGNvbnNvbGUubG9nKG9wdGlvbnMpO1xuXHRjb25zdCByZXEgPSBodHRwLnJlcXVlc3Qob3B0aW9ucywgZnVuY3Rpb24ocmVzKSB7XG5cdFx0cmVzLnNldEVuY29kaW5nKCd1dGY4Jyk7XG5cdFx0cmVzLm9uKCdlcnJvcicsIGZ1bmN0aW9uKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdFx0fSk7XG5cdFx0cmVzLm9uKCdkYXRhJywgZnVuY3Rpb24gKGNodW5rKSB7XG5cdFx0XHRyZXNEYXRhID0gcmVzRGF0YSArIGNodW5rO1xuXHRcdH0pO1xuXHRcdHJlcy5vbignZW5kJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0Y29uc29sZS5sb2cocmVzRGF0YSk7XG5cdFx0XHRhY2Nlc3NUb2tlbiA9IHJlc0RhdGEuY2FwO1xuXHRcdH0pXG5cdH0pXG5cblx0cmVxLndyaXRlKHJlcXVlc3REYXRhKTtcblx0cmVxLmVuZCgpO1xufSIsIi8vIFNlcnZlciBlbnRyeSBwb2ludCwgaW1wb3J0cyBhbGwgc2VydmVyIGNvZGVcblxuaW1wb3J0ICcvaW1wb3J0cy9zdGFydHVwL3NlcnZlcic7XG5pbXBvcnQgJy9pbXBvcnRzL3N0YXJ0dXAvYm90aCc7XG4iXX0=
