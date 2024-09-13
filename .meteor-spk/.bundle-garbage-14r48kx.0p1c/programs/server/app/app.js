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
      /*
      if (Meteor.isServer) {
      	getAccessToken(claimToken);
      } else {
      	console.log('getting access token')
      }
      */
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9zdGFydHVwL2JvdGgvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXIvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL3Bvd2VyYm94LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWFpbi5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJsaW5rIiwiTWV0ZW9yIiwidiIsImhlYWRlcnMiLCJodHRwIiwiZGVmYXVsdCIsImFjY2Vzc1Rva2VuIiwic2Vzc2lvbklkIiwidXJsUmVnZXgiLCJpc1NlcnZlciIsIm1ldGhvZHMiLCJjbGFpbVRva2VuIiwic2VsZiIsImNvbnNvbGUiLCJsb2ciLCJnZXQiLCJnZXRBY2Nlc3NUb2tlbiIsInByb3h5UGFyc2VkIiwicHJvY2VzcyIsImVudiIsIkhUVFBfUFJPWFkiLCJtYXRjaCIsInJlcXVlc3REYXRhIiwiSnNvbiIsInN0cmluZ2lmeSIsInJlc0RhdGEiLCJvcHRpb25zIiwiaG9zdCIsInBvcnQiLCJOdW1iZXIiLCJtZXRob2QiLCJwYXRoIiwicmVxIiwicmVxdWVzdCIsInJlcyIsInNldEVuY29kaW5nIiwib24iLCJlcnJvciIsImNodW5rIiwiY2FwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0Esd0M7Ozs7Ozs7Ozs7O0FDREFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLHVCQUFaO0FBQXFDRCxNQUFNLENBQUNDLElBQVAsQ0FBWSx5QkFBWjtBQUF1Q0QsTUFBTSxDQUFDQyxJQUFQLENBQVksdUJBQVosRTs7Ozs7Ozs7Ozs7QUNBNUUsSUFBSUMsTUFBSjtBQUFXRixNQUFNLENBQUNDLElBQVAsQ0FBWSxlQUFaLEVBQTRCO0FBQUNDLFFBQU0sQ0FBQ0MsQ0FBRCxFQUFHO0FBQUNELFVBQU0sR0FBQ0MsQ0FBUDtBQUFTOztBQUFwQixDQUE1QixFQUFrRCxDQUFsRDtBQUFxRCxJQUFJQyxPQUFKO0FBQVlKLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLDBCQUFaLEVBQXVDO0FBQUNHLFNBQU8sQ0FBQ0QsQ0FBRCxFQUFHO0FBQUNDLFdBQU8sR0FBQ0QsQ0FBUjtBQUFVOztBQUF0QixDQUF2QyxFQUErRCxDQUEvRDtBQUFrRSxJQUFJRSxJQUFKO0FBQVNMLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLE1BQVosRUFBbUI7QUFBQ0ssU0FBTyxDQUFDSCxDQUFELEVBQUc7QUFBQ0UsUUFBSSxHQUFDRixDQUFMO0FBQU87O0FBQW5CLENBQW5CLEVBQXdDLENBQXhDO0FBSXZKLElBQUlJLFdBQUo7QUFDQSxJQUFJQyxTQUFKO0FBQ0EsTUFBTUMsUUFBUSxHQUFHLHVDQUFqQjs7QUFFQSxJQUFJUCxNQUFNLENBQUNRLFFBQVgsRUFBcUI7QUFDcEJSLFFBQU0sQ0FBQ1MsT0FBUCxDQUFlO0FBQ2QsaUNBQTZCQyxVQUE3QixFQUF5QztBQUN4QyxZQUFNQyxJQUFJLEdBQUcsSUFBYjtBQUNBQyxhQUFPLENBQUNDLEdBQVIsd0JBQTRCSCxVQUE1QjtBQUNBSixlQUFTLEdBQUdKLE9BQU8sQ0FBQ1ksR0FBUixDQUFZSCxJQUFaLEVBQWtCLHdCQUFsQixDQUFaO0FBQ0FDLGFBQU8sQ0FBQ0MsR0FBUix1QkFBMkJQLFNBQTNCO0FBQ0E7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRzs7QUFiYSxHQUFmO0FBZUE7O0FBRUQsU0FBU1MsY0FBVCxDQUF3QkwsVUFBeEIsRUFBb0M7QUFDbkMsUUFBTU0sV0FBVyxHQUFHQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsVUFBWixDQUF1QkMsS0FBdkIsQ0FBNkJiLFFBQTdCLENBQXBCO0FBQ0EsUUFBTWMsV0FBVyxHQUFHQyxJQUFJLENBQUNDLFNBQUwsQ0FBZTtBQUNsQyxvQkFBZ0JiLFVBRGtCO0FBRWxDLDJCQUF1QjtBQUZXLEdBQWYsQ0FBcEI7QUFJQSxNQUFJYyxPQUFPLEdBQUcsRUFBZDtBQUNBLFFBQU1DLE9BQU8sR0FBRztBQUNmQyxRQUFJLFlBQUtWLFdBQVcsQ0FBQyxDQUFELENBQWhCLFNBQXNCQSxXQUFXLENBQUMsQ0FBRCxDQUFqQyxDQURXO0FBRWZXLFFBQUksRUFBRUMsTUFBTSxDQUFDWixXQUFXLENBQUMsQ0FBRCxDQUFaLENBRkc7QUFHZmEsVUFBTSxFQUFFLE1BSE87QUFJZkMsUUFBSSx1Q0FBZ0N4QixTQUFoQztBQUpXLEdBQWhCO0FBTUEsUUFBTXlCLEdBQUcsR0FBRzVCLElBQUksQ0FBQzZCLE9BQUwsQ0FBYVAsT0FBYixFQUFzQixVQUFTUSxHQUFULEVBQWM7QUFDL0NBLE9BQUcsQ0FBQ0MsV0FBSixDQUFnQixNQUFoQjtBQUNBRCxPQUFHLENBQUNFLEVBQUosQ0FBTyxPQUFQLEVBQWdCLFVBQVNDLEtBQVQsRUFBZ0I7QUFDL0J4QixhQUFPLENBQUNDLEdBQVIsQ0FBWXVCLEtBQVo7QUFDQSxLQUZEO0FBR0FILE9BQUcsQ0FBQ0UsRUFBSixDQUFPLE1BQVAsRUFBZSxVQUFVRSxLQUFWLEVBQWlCO0FBQy9CYixhQUFPLEdBQUdBLE9BQU8sR0FBR2EsS0FBcEI7QUFDQSxLQUZEO0FBR0FKLE9BQUcsQ0FBQ0UsRUFBSixDQUFPLEtBQVAsRUFBYyxZQUFZO0FBQ3pCdkIsYUFBTyxDQUFDQyxHQUFSLENBQVlXLE9BQVo7QUFDQW5CLGlCQUFXLEdBQUdtQixPQUFPLENBQUNjLEdBQXRCO0FBQ0EsS0FIRDtBQUlBLEdBWlcsQ0FBWjtBQWFBLEM7Ozs7Ozs7Ozs7O0FDcEREeEMsTUFBTSxDQUFDQyxJQUFQLENBQVkseUJBQVo7QUFBdUNELE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLHVCQUFaLEUiLCJmaWxlIjoiL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEltcG9ydCBtb2R1bGVzIHVzZWQgYnkgYm90aCBjbGllbnQgYW5kIHNlcnZlciB0aHJvdWdoIGEgc2luZ2xlIGluZGV4IGVudHJ5IHBvaW50XG4vLyBlLmcuIHVzZXJhY2NvdW50cyBjb25maWd1cmF0aW9uIGZpbGUuXG4iLCIvLyBJbXBvcnQgc2VydmVyIHN0YXJ0dXAgdGhyb3VnaCBhIHNpbmdsZSBpbmRleCBlbnRyeSBwb2ludFxuXG5pbXBvcnQgJy9pbXBvcnRzL3N0YXJ0dXAvYm90aCc7XG5pbXBvcnQgJy9pbXBvcnRzL3N0YXJ0dXAvc2VydmVyJztcbmltcG9ydCAnL2ltcG9ydHMvYXBpL3Bvd2VyYm94JzsiLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tICdtZXRlb3IvbWV0ZW9yJztcbmltcG9ydCB7IGhlYWRlcnMgfSBmcm9tICdtZXRlb3IvZ2FkaWNvaGVuOmhlYWRlcnMnO1xuaW1wb3J0IGh0dHAgZnJvbSAnaHR0cCc7XG5cbnZhciBhY2Nlc3NUb2tlbjtcbnZhciBzZXNzaW9uSWQ7XG5jb25zdCB1cmxSZWdleCA9IC8oW2EtejAtOV0rKTpcXC9cXC8oW2EtejAtOVxcLl0rKTooW1xcZF0rKS87XG5cbmlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcblx0TWV0ZW9yLm1ldGhvZHMoe1xuXHRcdFwic2FuZHN0b3JtLnN1Ym1pdENsYWltVG9rZW5cIihjbGFpbVRva2VuKSB7XG5cdFx0XHRjb25zdCBzZWxmID0gdGhpcztcblx0XHRcdGNvbnNvbGUubG9nKGBjbGFpbVRva2VuID0gJHtjbGFpbVRva2VufWApO1xuXHRcdFx0c2Vzc2lvbklkID0gaGVhZGVycy5nZXQoc2VsZiwgJ3gtc2FuZHN0b3JtLXNlc3Npb24taWQnKTtcblx0XHRcdGNvbnNvbGUubG9nKGBzZXNzaW9uSWQgPSAke3Nlc3Npb25JZH1gKTtcblx0XHRcdC8qXG5cdFx0XHRpZiAoTWV0ZW9yLmlzU2VydmVyKSB7XG5cdFx0XHRcdGdldEFjY2Vzc1Rva2VuKGNsYWltVG9rZW4pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2dldHRpbmcgYWNjZXNzIHRva2VuJylcblx0XHRcdH1cblx0XHRcdCovXG5cdFx0fVxuXHR9KVxufVxuXG5mdW5jdGlvbiBnZXRBY2Nlc3NUb2tlbihjbGFpbVRva2VuKSB7XG5cdGNvbnN0IHByb3h5UGFyc2VkID0gcHJvY2Vzcy5lbnYuSFRUUF9QUk9YWS5tYXRjaCh1cmxSZWdleCk7XG5cdGNvbnN0IHJlcXVlc3REYXRhID0gSnNvbi5zdHJpbmdpZnkoe1xuXHRcdFwicmVxdWVzdFRva2VuXCI6IGNsYWltVG9rZW4sXG5cdFx0XCJyZXF1aXJlZFBlcm1pc3Npb25zXCI6IFtdLFxuXHR9KTtcblx0dmFyIHJlc0RhdGEgPSBcIlwiO1xuXHRjb25zdCBvcHRpb25zID0ge1xuXHRcdGhvc3Q6IGAke3Byb3h5UGFyc2VkWzBdfSR7cHJveHlQYXJzZWRbMV19YCxcblx0XHRwb3J0OiBOdW1iZXIocHJveHlQYXJzZWRbMl0pLFxuXHRcdG1ldGhvZDogXCJQT1NUXCIsXG5cdFx0cGF0aDogYGh0dHA6Ly9odHRwLWJyaWRnZS9zZXNzaW9uLyR7c2Vzc2lvbklkfS9jbGFpbWAsXG5cdH07XG5cdGNvbnN0IHJlcSA9IGh0dHAucmVxdWVzdChvcHRpb25zLCBmdW5jdGlvbihyZXMpIHtcblx0XHRyZXMuc2V0RW5jb2RpbmcoJ3V0ZjgnKTtcblx0XHRyZXMub24oJ2Vycm9yJywgZnVuY3Rpb24oZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUubG9nKGVycm9yKTtcblx0XHR9KTtcblx0XHRyZXMub24oJ2RhdGEnLCBmdW5jdGlvbiAoY2h1bmspIHtcblx0XHRcdHJlc0RhdGEgPSByZXNEYXRhICsgY2h1bms7XG5cdFx0fSk7XG5cdFx0cmVzLm9uKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNEYXRhKTtcblx0XHRcdGFjY2Vzc1Rva2VuID0gcmVzRGF0YS5jYXA7XG5cdFx0fSlcblx0fSlcbn0iLCIvLyBTZXJ2ZXIgZW50cnkgcG9pbnQsIGltcG9ydHMgYWxsIHNlcnZlciBjb2RlXG5cbmltcG9ydCAnL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXInO1xuaW1wb3J0ICcvaW1wb3J0cy9zdGFydHVwL2JvdGgnO1xuIl19
