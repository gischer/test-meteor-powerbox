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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9zdGFydHVwL2JvdGgvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXIvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL3Bvd2VyYm94LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWFpbi5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJsaW5rIiwiTWV0ZW9yIiwidiIsImhlYWRlcnMiLCJodHRwIiwiZGVmYXVsdCIsImFjY2Vzc1Rva2VuIiwic2Vzc2lvbklkIiwidXJsUmVnZXgiLCJpc1NlcnZlciIsIm1ldGhvZHMiLCJjbGFpbVRva2VuIiwic2VsZiIsImNvbnNvbGUiLCJsb2ciLCJnZXQiLCJnZXRBY2Nlc3NUb2tlbiIsInByb3h5UGFyc2VkIiwicHJvY2VzcyIsImVudiIsIkhUVFBfUFJPWFkiLCJtYXRjaCIsInJlcXVlc3REYXRhIiwiSnNvbiIsInN0cmluZ2lmeSIsInJlc0RhdGEiLCJvcHRpb25zIiwiaG9zdCIsInBvcnQiLCJOdW1iZXIiLCJtZXRob2QiLCJwYXRoIiwicmVxIiwicmVxdWVzdCIsInJlcyIsInNldEVuY29kaW5nIiwib24iLCJlcnJvciIsImNodW5rIiwiY2FwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0Esd0M7Ozs7Ozs7Ozs7O0FDREFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLHVCQUFaO0FBQXFDRCxNQUFNLENBQUNDLElBQVAsQ0FBWSx5QkFBWjtBQUF1Q0QsTUFBTSxDQUFDQyxJQUFQLENBQVksdUJBQVosRTs7Ozs7Ozs7Ozs7QUNBNUUsSUFBSUMsTUFBSjtBQUFXRixNQUFNLENBQUNDLElBQVAsQ0FBWSxlQUFaLEVBQTRCO0FBQUNDLFFBQU0sQ0FBQ0MsQ0FBRCxFQUFHO0FBQUNELFVBQU0sR0FBQ0MsQ0FBUDtBQUFTOztBQUFwQixDQUE1QixFQUFrRCxDQUFsRDtBQUFxRCxJQUFJQyxPQUFKO0FBQVlKLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLDBCQUFaLEVBQXVDO0FBQUNHLFNBQU8sQ0FBQ0QsQ0FBRCxFQUFHO0FBQUNDLFdBQU8sR0FBQ0QsQ0FBUjtBQUFVOztBQUF0QixDQUF2QyxFQUErRCxDQUEvRDtBQUFrRSxJQUFJRSxJQUFKO0FBQVNMLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLE1BQVosRUFBbUI7QUFBQ0ssU0FBTyxDQUFDSCxDQUFELEVBQUc7QUFBQ0UsUUFBSSxHQUFDRixDQUFMO0FBQU87O0FBQW5CLENBQW5CLEVBQXdDLENBQXhDO0FBSXZKLElBQUlJLFdBQUo7QUFDQSxJQUFJQyxTQUFKO0FBQ0EsTUFBTUMsUUFBUSxHQUFHLHVDQUFqQjs7QUFFQSxJQUFJUCxNQUFNLENBQUNRLFFBQVgsRUFBcUI7QUFDcEJSLFFBQU0sQ0FBQ1MsT0FBUCxDQUFlO0FBQ2QsaUNBQTZCQyxVQUE3QixFQUF5QztBQUN4QyxZQUFNQyxJQUFJLEdBQUcsSUFBYjtBQUNBQyxhQUFPLENBQUNDLEdBQVIsd0JBQTRCSCxVQUE1QjtBQUNBSixlQUFTLEdBQUdKLE9BQU8sQ0FBQ1ksR0FBUixDQUFZSCxJQUFaLEVBQWtCLHdCQUFsQixDQUFaO0FBQ0FDLGFBQU8sQ0FBQ0MsR0FBUix1QkFBMkJQLFNBQTNCOztBQUNBLFVBQUlOLE1BQU0sQ0FBQ1EsUUFBWCxFQUFxQjtBQUNwQk8sc0JBQWMsQ0FBQ0wsVUFBRCxDQUFkO0FBQ0EsT0FGRCxNQUVPO0FBQ05FLGVBQU8sQ0FBQ0MsR0FBUixDQUFZLHNCQUFaO0FBQ0E7QUFDRDs7QUFYYSxHQUFmO0FBYUE7O0FBRUQsU0FBU0UsY0FBVCxDQUF3QkwsVUFBeEIsRUFBb0M7QUFDbkMsUUFBTU0sV0FBVyxHQUFHQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsVUFBWixDQUF1QkMsS0FBdkIsQ0FBNkJiLFFBQTdCLENBQXBCO0FBQ0EsUUFBTWMsV0FBVyxHQUFHQyxJQUFJLENBQUNDLFNBQUwsQ0FBZTtBQUNsQyxvQkFBZ0JiLFVBRGtCO0FBRWxDLDJCQUF1QjtBQUZXLEdBQWYsQ0FBcEI7QUFJQSxNQUFJYyxPQUFPLEdBQUcsRUFBZDtBQUNBLFFBQU1DLE9BQU8sR0FBRztBQUNmQyxRQUFJLFlBQUtWLFdBQVcsQ0FBQyxDQUFELENBQWhCLFNBQXNCQSxXQUFXLENBQUMsQ0FBRCxDQUFqQyxDQURXO0FBRWZXLFFBQUksRUFBRUMsTUFBTSxDQUFDWixXQUFXLENBQUMsQ0FBRCxDQUFaLENBRkc7QUFHZmEsVUFBTSxFQUFFLE1BSE87QUFJZkMsUUFBSSx1Q0FBZ0N4QixTQUFoQztBQUpXLEdBQWhCO0FBTUEsUUFBTXlCLEdBQUcsR0FBRzVCLElBQUksQ0FBQzZCLE9BQUwsQ0FBYVAsT0FBYixFQUFzQixVQUFTUSxHQUFULEVBQWM7QUFDL0NBLE9BQUcsQ0FBQ0MsV0FBSixDQUFnQixNQUFoQjtBQUNBRCxPQUFHLENBQUNFLEVBQUosQ0FBTyxPQUFQLEVBQWdCLFVBQVNDLEtBQVQsRUFBZ0I7QUFDL0J4QixhQUFPLENBQUNDLEdBQVIsQ0FBWXVCLEtBQVo7QUFDQSxLQUZEO0FBR0FILE9BQUcsQ0FBQ0UsRUFBSixDQUFPLE1BQVAsRUFBZSxVQUFVRSxLQUFWLEVBQWlCO0FBQy9CYixhQUFPLEdBQUdBLE9BQU8sR0FBR2EsS0FBcEI7QUFDQSxLQUZEO0FBR0FKLE9BQUcsQ0FBQ0UsRUFBSixDQUFPLEtBQVAsRUFBYyxZQUFZO0FBQ3pCdkIsYUFBTyxDQUFDQyxHQUFSLENBQVlXLE9BQVo7QUFDQW5CLGlCQUFXLEdBQUdtQixPQUFPLENBQUNjLEdBQXRCO0FBQ0EsS0FIRDtBQUlBLEdBWlcsQ0FBWjtBQWFBLEM7Ozs7Ozs7Ozs7O0FDbEREeEMsTUFBTSxDQUFDQyxJQUFQLENBQVkseUJBQVo7QUFBdUNELE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLHVCQUFaLEUiLCJmaWxlIjoiL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEltcG9ydCBtb2R1bGVzIHVzZWQgYnkgYm90aCBjbGllbnQgYW5kIHNlcnZlciB0aHJvdWdoIGEgc2luZ2xlIGluZGV4IGVudHJ5IHBvaW50XG4vLyBlLmcuIHVzZXJhY2NvdW50cyBjb25maWd1cmF0aW9uIGZpbGUuXG4iLCIvLyBJbXBvcnQgc2VydmVyIHN0YXJ0dXAgdGhyb3VnaCBhIHNpbmdsZSBpbmRleCBlbnRyeSBwb2ludFxuXG5pbXBvcnQgJy9pbXBvcnRzL3N0YXJ0dXAvYm90aCc7XG5pbXBvcnQgJy9pbXBvcnRzL3N0YXJ0dXAvc2VydmVyJztcbmltcG9ydCAnL2ltcG9ydHMvYXBpL3Bvd2VyYm94JzsiLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tICdtZXRlb3IvbWV0ZW9yJztcbmltcG9ydCB7IGhlYWRlcnMgfSBmcm9tICdtZXRlb3IvZ2FkaWNvaGVuOmhlYWRlcnMnO1xuaW1wb3J0IGh0dHAgZnJvbSAnaHR0cCc7XG5cbnZhciBhY2Nlc3NUb2tlbjtcbnZhciBzZXNzaW9uSWQ7XG5jb25zdCB1cmxSZWdleCA9IC8oW2EtejAtOV0rKTpcXC9cXC8oW2EtejAtOVxcLl0rKTooW1xcZF0rKS87XG5cbmlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcblx0TWV0ZW9yLm1ldGhvZHMoe1xuXHRcdFwic2FuZHN0b3JtLnN1Ym1pdENsYWltVG9rZW5cIihjbGFpbVRva2VuKSB7XG5cdFx0XHRjb25zdCBzZWxmID0gdGhpcztcblx0XHRcdGNvbnNvbGUubG9nKGBjbGFpbVRva2VuID0gJHtjbGFpbVRva2VufWApO1xuXHRcdFx0c2Vzc2lvbklkID0gaGVhZGVycy5nZXQoc2VsZiwgJ3gtc2FuZHN0b3JtLXNlc3Npb24taWQnKTtcblx0XHRcdGNvbnNvbGUubG9nKGBzZXNzaW9uSWQgPSAke3Nlc3Npb25JZH1gKTtcblx0XHRcdGlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcblx0XHRcdFx0Z2V0QWNjZXNzVG9rZW4oY2xhaW1Ub2tlbik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnZ2V0dGluZyBhY2Nlc3MgdG9rZW4nKVxuXHRcdFx0fVxuXHRcdH1cblx0fSlcbn1cblxuZnVuY3Rpb24gZ2V0QWNjZXNzVG9rZW4oY2xhaW1Ub2tlbikge1xuXHRjb25zdCBwcm94eVBhcnNlZCA9IHByb2Nlc3MuZW52LkhUVFBfUFJPWFkubWF0Y2godXJsUmVnZXgpO1xuXHRjb25zdCByZXF1ZXN0RGF0YSA9IEpzb24uc3RyaW5naWZ5KHtcblx0XHRcInJlcXVlc3RUb2tlblwiOiBjbGFpbVRva2VuLFxuXHRcdFwicmVxdWlyZWRQZXJtaXNzaW9uc1wiOiBbXSxcblx0fSk7XG5cdHZhciByZXNEYXRhID0gXCJcIjtcblx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRob3N0OiBgJHtwcm94eVBhcnNlZFswXX0ke3Byb3h5UGFyc2VkWzFdfWAsXG5cdFx0cG9ydDogTnVtYmVyKHByb3h5UGFyc2VkWzJdKSxcblx0XHRtZXRob2Q6IFwiUE9TVFwiLFxuXHRcdHBhdGg6IGBodHRwOi8vaHR0cC1icmlkZ2Uvc2Vzc2lvbi8ke3Nlc3Npb25JZH0vY2xhaW1gLFxuXHR9O1xuXHRjb25zdCByZXEgPSBodHRwLnJlcXVlc3Qob3B0aW9ucywgZnVuY3Rpb24ocmVzKSB7XG5cdFx0cmVzLnNldEVuY29kaW5nKCd1dGY4Jyk7XG5cdFx0cmVzLm9uKCdlcnJvcicsIGZ1bmN0aW9uKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdFx0fSk7XG5cdFx0cmVzLm9uKCdkYXRhJywgZnVuY3Rpb24gKGNodW5rKSB7XG5cdFx0XHRyZXNEYXRhID0gcmVzRGF0YSArIGNodW5rO1xuXHRcdH0pO1xuXHRcdHJlcy5vbignZW5kJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0Y29uc29sZS5sb2cocmVzRGF0YSk7XG5cdFx0XHRhY2Nlc3NUb2tlbiA9IHJlc0RhdGEuY2FwO1xuXHRcdH0pXG5cdH0pXG59IiwiLy8gU2VydmVyIGVudHJ5IHBvaW50LCBpbXBvcnRzIGFsbCBzZXJ2ZXIgY29kZVxuXG5pbXBvcnQgJy9pbXBvcnRzL3N0YXJ0dXAvc2VydmVyJztcbmltcG9ydCAnL2ltcG9ydHMvc3RhcnR1cC9ib3RoJztcbiJdfQ==
