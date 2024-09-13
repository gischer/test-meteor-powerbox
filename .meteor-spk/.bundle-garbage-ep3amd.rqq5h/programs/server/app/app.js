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
      getAccessToken(claimToken);
    }

  });
}

function getAccessToken(claimToken) {
  if (Meteor.isClient) return;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9zdGFydHVwL2JvdGgvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXIvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL3Bvd2VyYm94LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWFpbi5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJsaW5rIiwiTWV0ZW9yIiwidiIsImhlYWRlcnMiLCJodHRwIiwiZGVmYXVsdCIsImFjY2Vzc1Rva2VuIiwic2Vzc2lvbklkIiwidXJsUmVnZXgiLCJpc1NlcnZlciIsIm1ldGhvZHMiLCJjbGFpbVRva2VuIiwic2VsZiIsImNvbnNvbGUiLCJsb2ciLCJnZXQiLCJnZXRBY2Nlc3NUb2tlbiIsImlzQ2xpZW50IiwicHJveHlQYXJzZWQiLCJwcm9jZXNzIiwiZW52IiwiSFRUUF9QUk9YWSIsIm1hdGNoIiwicmVxdWVzdERhdGEiLCJKc29uIiwic3RyaW5naWZ5IiwicmVzRGF0YSIsIm9wdGlvbnMiLCJob3N0IiwicG9ydCIsIk51bWJlciIsIm1ldGhvZCIsInBhdGgiLCJyZXEiLCJyZXF1ZXN0IiwicmVzIiwic2V0RW5jb2RpbmciLCJvbiIsImNodW5rIiwiY2FwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0Esd0M7Ozs7Ozs7Ozs7O0FDREFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLHVCQUFaO0FBQXFDRCxNQUFNLENBQUNDLElBQVAsQ0FBWSx5QkFBWjtBQUF1Q0QsTUFBTSxDQUFDQyxJQUFQLENBQVksdUJBQVosRTs7Ozs7Ozs7Ozs7QUNBNUUsSUFBSUMsTUFBSjtBQUFXRixNQUFNLENBQUNDLElBQVAsQ0FBWSxlQUFaLEVBQTRCO0FBQUNDLFFBQU0sQ0FBQ0MsQ0FBRCxFQUFHO0FBQUNELFVBQU0sR0FBQ0MsQ0FBUDtBQUFTOztBQUFwQixDQUE1QixFQUFrRCxDQUFsRDtBQUFxRCxJQUFJQyxPQUFKO0FBQVlKLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLDBCQUFaLEVBQXVDO0FBQUNHLFNBQU8sQ0FBQ0QsQ0FBRCxFQUFHO0FBQUNDLFdBQU8sR0FBQ0QsQ0FBUjtBQUFVOztBQUF0QixDQUF2QyxFQUErRCxDQUEvRDtBQUFrRSxJQUFJRSxJQUFKO0FBQVNMLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLE1BQVosRUFBbUI7QUFBQ0ssU0FBTyxDQUFDSCxDQUFELEVBQUc7QUFBQ0UsUUFBSSxHQUFDRixDQUFMO0FBQU87O0FBQW5CLENBQW5CLEVBQXdDLENBQXhDO0FBSXZKLElBQUlJLFdBQUo7QUFDQSxJQUFJQyxTQUFKO0FBQ0EsTUFBTUMsUUFBUSxHQUFHLHVDQUFqQjs7QUFFQSxJQUFJUCxNQUFNLENBQUNRLFFBQVgsRUFBcUI7QUFDcEJSLFFBQU0sQ0FBQ1MsT0FBUCxDQUFlO0FBQ2QsaUNBQTZCQyxVQUE3QixFQUF5QztBQUN4QyxZQUFNQyxJQUFJLEdBQUcsSUFBYjtBQUNBQyxhQUFPLENBQUNDLEdBQVIsd0JBQTRCSCxVQUE1QjtBQUNBSixlQUFTLEdBQUdKLE9BQU8sQ0FBQ1ksR0FBUixDQUFZSCxJQUFaLEVBQWtCLHdCQUFsQixDQUFaO0FBQ0FDLGFBQU8sQ0FBQ0MsR0FBUix1QkFBMkJQLFNBQTNCO0FBQ0FTLG9CQUFjLENBQUNMLFVBQUQsQ0FBZDtBQUNBOztBQVBhLEdBQWY7QUFTQTs7QUFFRCxTQUFTSyxjQUFULENBQXdCTCxVQUF4QixFQUFvQztBQUNuQyxNQUFJVixNQUFNLENBQUNnQixRQUFYLEVBQXFCO0FBQ3JCLFFBQU1DLFdBQVcsR0FBR0MsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFVBQVosQ0FBdUJDLEtBQXZCLENBQTZCZCxRQUE3QixDQUFwQjtBQUNBLFFBQU1lLFdBQVcsR0FBR0MsSUFBSSxDQUFDQyxTQUFMLENBQWU7QUFDbEMsb0JBQWdCZCxVQURrQjtBQUVsQywyQkFBdUI7QUFGVyxHQUFmLENBQXBCO0FBSUEsTUFBSWUsT0FBTyxHQUFHLEVBQWQ7QUFDQSxRQUFNQyxPQUFPLEdBQUc7QUFDZkMsUUFBSSxZQUFLVixXQUFXLENBQUMsQ0FBRCxDQUFoQixTQUFzQkEsV0FBVyxDQUFDLENBQUQsQ0FBakMsQ0FEVztBQUVmVyxRQUFJLEVBQUVDLE1BQU0sQ0FBQ1osV0FBVyxDQUFDLENBQUQsQ0FBWixDQUZHO0FBR2ZhLFVBQU0sRUFBRSxNQUhPO0FBSWZDLFFBQUksdUNBQWdDekIsU0FBaEM7QUFKVyxHQUFoQjtBQU1BLFFBQU0wQixHQUFHLEdBQUc3QixJQUFJLENBQUM4QixPQUFMLENBQWFQLE9BQWIsRUFBc0IsVUFBU1EsR0FBVCxFQUFjO0FBQy9DQSxPQUFHLENBQUNDLFdBQUosQ0FBZ0IsTUFBaEI7QUFDQUQsT0FBRyxDQUFDRSxFQUFKLENBQU8sTUFBUCxFQUFlLFVBQVVDLEtBQVYsRUFBaUI7QUFDL0JaLGFBQU8sR0FBR0EsT0FBTyxHQUFHWSxLQUFwQjtBQUNBLEtBRkQ7QUFHQUgsT0FBRyxDQUFDRSxFQUFKLENBQU8sS0FBUCxFQUFjLFlBQVk7QUFDekJ4QixhQUFPLENBQUNDLEdBQVIsQ0FBWVksT0FBWjtBQUNBcEIsaUJBQVcsR0FBR29CLE9BQU8sQ0FBQ2EsR0FBdEI7QUFDQSxLQUhEO0FBSUEsR0FUVyxDQUFaO0FBVUEsQzs7Ozs7Ozs7Ozs7QUM1Q0R4QyxNQUFNLENBQUNDLElBQVAsQ0FBWSx5QkFBWjtBQUF1Q0QsTUFBTSxDQUFDQyxJQUFQLENBQVksdUJBQVosRSIsImZpbGUiOiIvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0IG1vZHVsZXMgdXNlZCBieSBib3RoIGNsaWVudCBhbmQgc2VydmVyIHRocm91Z2ggYSBzaW5nbGUgaW5kZXggZW50cnkgcG9pbnRcbi8vIGUuZy4gdXNlcmFjY291bnRzIGNvbmZpZ3VyYXRpb24gZmlsZS5cbiIsIi8vIEltcG9ydCBzZXJ2ZXIgc3RhcnR1cCB0aHJvdWdoIGEgc2luZ2xlIGluZGV4IGVudHJ5IHBvaW50XG5cbmltcG9ydCAnL2ltcG9ydHMvc3RhcnR1cC9ib3RoJztcbmltcG9ydCAnL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXInO1xuaW1wb3J0ICcvaW1wb3J0cy9hcGkvcG93ZXJib3gnOyIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IHsgaGVhZGVycyB9IGZyb20gJ21ldGVvci9nYWRpY29oZW46aGVhZGVycyc7XG5pbXBvcnQgaHR0cCBmcm9tICdodHRwJztcblxudmFyIGFjY2Vzc1Rva2VuO1xudmFyIHNlc3Npb25JZDtcbmNvbnN0IHVybFJlZ2V4ID0gLyhbYS16MC05XSspOlxcL1xcLyhbYS16MC05XFwuXSspOihbXFxkXSspLztcblxuaWYgKE1ldGVvci5pc1NlcnZlcikge1xuXHRNZXRlb3IubWV0aG9kcyh7XG5cdFx0XCJzYW5kc3Rvcm0uc3VibWl0Q2xhaW1Ub2tlblwiKGNsYWltVG9rZW4pIHtcblx0XHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXHRcdFx0Y29uc29sZS5sb2coYGNsYWltVG9rZW4gPSAke2NsYWltVG9rZW59YCk7XG5cdFx0XHRzZXNzaW9uSWQgPSBoZWFkZXJzLmdldChzZWxmLCAneC1zYW5kc3Rvcm0tc2Vzc2lvbi1pZCcpO1xuXHRcdFx0Y29uc29sZS5sb2coYHNlc3Npb25JZCA9ICR7c2Vzc2lvbklkfWApO1xuXHRcdFx0Z2V0QWNjZXNzVG9rZW4oY2xhaW1Ub2tlbik7XG5cdFx0fVxuXHR9KVxufVxuXG5mdW5jdGlvbiBnZXRBY2Nlc3NUb2tlbihjbGFpbVRva2VuKSB7XG5cdGlmIChNZXRlb3IuaXNDbGllbnQpIHJldHVybjtcblx0Y29uc3QgcHJveHlQYXJzZWQgPSBwcm9jZXNzLmVudi5IVFRQX1BST1hZLm1hdGNoKHVybFJlZ2V4KTtcblx0Y29uc3QgcmVxdWVzdERhdGEgPSBKc29uLnN0cmluZ2lmeSh7XG5cdFx0XCJyZXF1ZXN0VG9rZW5cIjogY2xhaW1Ub2tlbixcblx0XHRcInJlcXVpcmVkUGVybWlzc2lvbnNcIjogW10sXG5cdH0pO1xuXHR2YXIgcmVzRGF0YSA9IFwiXCI7XG5cdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0aG9zdDogYCR7cHJveHlQYXJzZWRbMF19JHtwcm94eVBhcnNlZFsxXX1gLFxuXHRcdHBvcnQ6IE51bWJlcihwcm94eVBhcnNlZFsyXSksXG5cdFx0bWV0aG9kOiBcIlBPU1RcIixcblx0XHRwYXRoOiBgaHR0cDovL2h0dHAtYnJpZGdlL3Nlc3Npb24vJHtzZXNzaW9uSWR9L2NsYWltYCxcblx0fTtcblx0Y29uc3QgcmVxID0gaHR0cC5yZXF1ZXN0KG9wdGlvbnMsIGZ1bmN0aW9uKHJlcykge1xuXHRcdHJlcy5zZXRFbmNvZGluZygndXRmOCcpO1xuXHRcdHJlcy5vbignZGF0YScsIGZ1bmN0aW9uIChjaHVuaykge1xuXHRcdFx0cmVzRGF0YSA9IHJlc0RhdGEgKyBjaHVuaztcblx0XHR9KTtcblx0XHRyZXMub24oJ2VuZCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdGNvbnNvbGUubG9nKHJlc0RhdGEpO1xuXHRcdFx0YWNjZXNzVG9rZW4gPSByZXNEYXRhLmNhcDtcblx0XHR9KVxuXHR9KVxufSIsIi8vIFNlcnZlciBlbnRyeSBwb2ludCwgaW1wb3J0cyBhbGwgc2VydmVyIGNvZGVcblxuaW1wb3J0ICcvaW1wb3J0cy9zdGFydHVwL3NlcnZlcic7XG5pbXBvcnQgJy9pbXBvcnRzL3N0YXJ0dXAvYm90aCc7XG4iXX0=
