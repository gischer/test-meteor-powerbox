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
    host: 'http-bridge',
    path: "/session/".concat(sessionId, "/claim")
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9zdGFydHVwL2JvdGgvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXIvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL3Bvd2VyYm94LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWFpbi5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJsaW5rIiwiTWV0ZW9yIiwidiIsImhlYWRlcnMiLCJodHRwIiwiZGVmYXVsdCIsImFjY2Vzc1Rva2VuIiwic2Vzc2lvbklkIiwidXJsUmVnZXgiLCJpc1NlcnZlciIsIm1ldGhvZHMiLCJjbGFpbVRva2VuIiwic2VsZiIsImNvbnNvbGUiLCJsb2ciLCJnZXQiLCJnZXRBY2Nlc3NUb2tlbiIsInByb3h5UGFyc2VkIiwicHJvY2VzcyIsImVudiIsIkhUVFBfUFJPWFkiLCJtYXRjaCIsInJlcXVlc3REYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlc0RhdGEiLCJvcHRpb25zIiwicHJvdG9jb2wiLCJob3N0IiwicG9ydCIsIk51bWJlciIsIm1ldGhvZCIsInBhdGgiLCJyZXEiLCJyZXF1ZXN0IiwicmVzIiwic2V0RW5jb2RpbmciLCJvbiIsImVycm9yIiwiY2h1bmsiLCJjYXAiLCJ3cml0ZSIsImVuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBLHdDOzs7Ozs7Ozs7OztBQ0RBQSxNQUFNLENBQUNDLElBQVAsQ0FBWSx1QkFBWjtBQUFxQ0QsTUFBTSxDQUFDQyxJQUFQLENBQVkseUJBQVo7QUFBdUNELE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLHVCQUFaLEU7Ozs7Ozs7Ozs7O0FDQTVFLElBQUlDLE1BQUo7QUFBV0YsTUFBTSxDQUFDQyxJQUFQLENBQVksZUFBWixFQUE0QjtBQUFDQyxRQUFNLENBQUNDLENBQUQsRUFBRztBQUFDRCxVQUFNLEdBQUNDLENBQVA7QUFBUzs7QUFBcEIsQ0FBNUIsRUFBa0QsQ0FBbEQ7QUFBcUQsSUFBSUMsT0FBSjtBQUFZSixNQUFNLENBQUNDLElBQVAsQ0FBWSwwQkFBWixFQUF1QztBQUFDRyxTQUFPLENBQUNELENBQUQsRUFBRztBQUFDQyxXQUFPLEdBQUNELENBQVI7QUFBVTs7QUFBdEIsQ0FBdkMsRUFBK0QsQ0FBL0Q7QUFBa0UsSUFBSUUsSUFBSjtBQUFTTCxNQUFNLENBQUNDLElBQVAsQ0FBWSxNQUFaLEVBQW1CO0FBQUNLLFNBQU8sQ0FBQ0gsQ0FBRCxFQUFHO0FBQUNFLFFBQUksR0FBQ0YsQ0FBTDtBQUFPOztBQUFuQixDQUFuQixFQUF3QyxDQUF4QztBQUl2SixJQUFJSSxXQUFKO0FBQ0EsSUFBSUMsU0FBSjtBQUNBLE1BQU1DLFFBQVEsR0FBRyx1Q0FBakI7O0FBRUEsSUFBSVAsTUFBTSxDQUFDUSxRQUFYLEVBQXFCO0FBQ3BCUixRQUFNLENBQUNTLE9BQVAsQ0FBZTtBQUNkLGlDQUE2QkMsVUFBN0IsRUFBeUM7QUFDeEMsWUFBTUMsSUFBSSxHQUFHLElBQWI7QUFDQUMsYUFBTyxDQUFDQyxHQUFSLHdCQUE0QkgsVUFBNUI7QUFDQUosZUFBUyxHQUFHSixPQUFPLENBQUNZLEdBQVIsQ0FBWUgsSUFBWixFQUFrQix3QkFBbEIsQ0FBWjtBQUNBQyxhQUFPLENBQUNDLEdBQVIsdUJBQTJCUCxTQUEzQjs7QUFDQSxVQUFJTixNQUFNLENBQUNRLFFBQVgsRUFBcUI7QUFDcEJPLHNCQUFjLENBQUNMLFVBQUQsQ0FBZDtBQUNBLE9BRkQsTUFFTztBQUNORSxlQUFPLENBQUNDLEdBQVIsQ0FBWSxzQkFBWjtBQUNBO0FBQ0Q7O0FBWGEsR0FBZjtBQWFBOztBQUVELFNBQVNFLGNBQVQsQ0FBd0JMLFVBQXhCLEVBQW9DO0FBQ25DLFFBQU1NLFdBQVcsR0FBR0MsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFVBQVosQ0FBdUJDLEtBQXZCLENBQTZCYixRQUE3QixDQUFwQjtBQUNBLFFBQU1jLFdBQVcsR0FBR0MsSUFBSSxDQUFDQyxTQUFMLENBQWU7QUFDbEMsb0JBQWdCYixVQURrQjtBQUVsQywyQkFBdUI7QUFGVyxHQUFmLENBQXBCO0FBSUEsTUFBSWMsT0FBTyxHQUFHLEVBQWQ7QUFDQSxRQUFNQyxPQUFPLEdBQUc7QUFDZkMsWUFBUSxFQUFFLE9BREs7QUFFZkMsUUFBSSxFQUFFWCxXQUFXLENBQUMsQ0FBRCxDQUZGO0FBR2ZZLFFBQUksRUFBRUMsTUFBTSxDQUFDYixXQUFXLENBQUMsQ0FBRCxDQUFaLENBSEc7QUFJZmMsVUFBTSxFQUFFLE1BSk87QUFLZkgsUUFBSSxFQUFFLGFBTFM7QUFNZkksUUFBSSxxQkFBY3pCLFNBQWQ7QUFOVyxHQUFoQjtBQVFBTSxTQUFPLENBQUNDLEdBQVIsQ0FBWSxxQkFBcUJILFVBQWpDO0FBQ0FFLFNBQU8sQ0FBQ0MsR0FBUixDQUFZWSxPQUFaO0FBQ0EsUUFBTU8sR0FBRyxHQUFHN0IsSUFBSSxDQUFDOEIsT0FBTCxDQUFhUixPQUFiLEVBQXNCLFVBQVNTLEdBQVQsRUFBYztBQUMvQ0EsT0FBRyxDQUFDQyxXQUFKLENBQWdCLE1BQWhCO0FBQ0FELE9BQUcsQ0FBQ0UsRUFBSixDQUFPLE9BQVAsRUFBZ0IsVUFBU0MsS0FBVCxFQUFnQjtBQUMvQnpCLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLE9BQVosRUFEK0IsQ0FFL0I7QUFDQSxLQUhEO0FBSUFxQixPQUFHLENBQUNFLEVBQUosQ0FBTyxNQUFQLEVBQWUsVUFBVUUsS0FBVixFQUFpQjtBQUMvQmQsYUFBTyxHQUFHQSxPQUFPLEdBQUdjLEtBQXBCO0FBQ0EsS0FGRDtBQUdBSixPQUFHLENBQUNFLEVBQUosQ0FBTyxLQUFQLEVBQWMsWUFBWTtBQUN6QnhCLGFBQU8sQ0FBQ0MsR0FBUixDQUFZVyxPQUFaO0FBQ0FuQixpQkFBVyxHQUFHbUIsT0FBTyxDQUFDZSxHQUF0QjtBQUNBLEtBSEQ7QUFJQSxHQWJXLENBQVo7QUFlQVAsS0FBRyxDQUFDUSxLQUFKLENBQVVuQixXQUFWO0FBQ0FXLEtBQUcsQ0FBQ1MsR0FBSjtBQUNBN0IsU0FBTyxDQUFDQyxHQUFSLENBQVksS0FBWjtBQUNBLEM7Ozs7Ozs7Ozs7O0FDM0REZixNQUFNLENBQUNDLElBQVAsQ0FBWSx5QkFBWjtBQUF1Q0QsTUFBTSxDQUFDQyxJQUFQLENBQVksdUJBQVosRSIsImZpbGUiOiIvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0IG1vZHVsZXMgdXNlZCBieSBib3RoIGNsaWVudCBhbmQgc2VydmVyIHRocm91Z2ggYSBzaW5nbGUgaW5kZXggZW50cnkgcG9pbnRcbi8vIGUuZy4gdXNlcmFjY291bnRzIGNvbmZpZ3VyYXRpb24gZmlsZS5cbiIsIi8vIEltcG9ydCBzZXJ2ZXIgc3RhcnR1cCB0aHJvdWdoIGEgc2luZ2xlIGluZGV4IGVudHJ5IHBvaW50XG5cbmltcG9ydCAnL2ltcG9ydHMvc3RhcnR1cC9ib3RoJztcbmltcG9ydCAnL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXInO1xuaW1wb3J0ICcvaW1wb3J0cy9hcGkvcG93ZXJib3gnOyIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IHsgaGVhZGVycyB9IGZyb20gJ21ldGVvci9nYWRpY29oZW46aGVhZGVycyc7XG5pbXBvcnQgaHR0cCBmcm9tICdodHRwJztcblxudmFyIGFjY2Vzc1Rva2VuO1xudmFyIHNlc3Npb25JZDtcbmNvbnN0IHVybFJlZ2V4ID0gLyhbYS16MC05XSspOlxcL1xcLyhbYS16MC05XFwuXSspOihbXFxkXSspLztcblxuaWYgKE1ldGVvci5pc1NlcnZlcikge1xuXHRNZXRlb3IubWV0aG9kcyh7XG5cdFx0XCJzYW5kc3Rvcm0uc3VibWl0Q2xhaW1Ub2tlblwiKGNsYWltVG9rZW4pIHtcblx0XHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXHRcdFx0Y29uc29sZS5sb2coYGNsYWltVG9rZW4gPSAke2NsYWltVG9rZW59YCk7XG5cdFx0XHRzZXNzaW9uSWQgPSBoZWFkZXJzLmdldChzZWxmLCAneC1zYW5kc3Rvcm0tc2Vzc2lvbi1pZCcpO1xuXHRcdFx0Y29uc29sZS5sb2coYHNlc3Npb25JZCA9ICR7c2Vzc2lvbklkfWApO1xuXHRcdFx0aWYgKE1ldGVvci5pc1NlcnZlcikge1xuXHRcdFx0XHRnZXRBY2Nlc3NUb2tlbihjbGFpbVRva2VuKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdnZXR0aW5nIGFjY2VzcyB0b2tlbicpXG5cdFx0XHR9XG5cdFx0fVxuXHR9KVxufVxuXG5mdW5jdGlvbiBnZXRBY2Nlc3NUb2tlbihjbGFpbVRva2VuKSB7XG5cdGNvbnN0IHByb3h5UGFyc2VkID0gcHJvY2Vzcy5lbnYuSFRUUF9QUk9YWS5tYXRjaCh1cmxSZWdleCk7XG5cdGNvbnN0IHJlcXVlc3REYXRhID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFwicmVxdWVzdFRva2VuXCI6IGNsYWltVG9rZW4sXG5cdFx0XCJyZXF1aXJlZFBlcm1pc3Npb25zXCI6IFtdLFxuXHR9KTtcblx0dmFyIHJlc0RhdGEgPSBcIlwiO1xuXHRjb25zdCBvcHRpb25zID0ge1xuXHRcdHByb3RvY29sOiAnaHR0cDonLFxuXHRcdGhvc3Q6IHByb3h5UGFyc2VkWzJdLFxuXHRcdHBvcnQ6IE51bWJlcihwcm94eVBhcnNlZFszXSksXG5cdFx0bWV0aG9kOiBcIlBPU1RcIixcblx0XHRob3N0OiAnaHR0cC1icmlkZ2UnLFxuXHRcdHBhdGg6IGAvc2Vzc2lvbi8ke3Nlc3Npb25JZH0vY2xhaW1gLFxuXHR9O1xuXHRjb25zb2xlLmxvZygnZ2V0QWNjZXNzVG9rZW46ICcgKyBjbGFpbVRva2VuKVxuXHRjb25zb2xlLmxvZyhvcHRpb25zKTtcblx0Y29uc3QgcmVxID0gaHR0cC5yZXF1ZXN0KG9wdGlvbnMsIGZ1bmN0aW9uKHJlcykge1xuXHRcdHJlcy5zZXRFbmNvZGluZygndXRmOCcpO1xuXHRcdHJlcy5vbignZXJyb3InLCBmdW5jdGlvbihlcnJvcikge1xuXHRcdFx0Y29uc29sZS5sb2coXCJFcnJvclwiKTtcblx0XHRcdC8vY29uc29sZS5sb2coZXJyb3IpO1xuXHRcdH0pO1xuXHRcdHJlcy5vbignZGF0YScsIGZ1bmN0aW9uIChjaHVuaykge1xuXHRcdFx0cmVzRGF0YSA9IHJlc0RhdGEgKyBjaHVuaztcblx0XHR9KTtcblx0XHRyZXMub24oJ2VuZCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdGNvbnNvbGUubG9nKHJlc0RhdGEpO1xuXHRcdFx0YWNjZXNzVG9rZW4gPSByZXNEYXRhLmNhcDtcblx0XHR9KVxuXHR9KVxuXG5cdHJlcS53cml0ZShyZXF1ZXN0RGF0YSk7XG5cdHJlcS5lbmQoKTtcblx0Y29uc29sZS5sb2coJ2VuZCcpO1xufSIsIi8vIFNlcnZlciBlbnRyeSBwb2ludCwgaW1wb3J0cyBhbGwgc2VydmVyIGNvZGVcblxuaW1wb3J0ICcvaW1wb3J0cy9zdGFydHVwL3NlcnZlcic7XG5pbXBvcnQgJy9pbXBvcnRzL3N0YXJ0dXAvYm90aCc7XG4iXX0=
