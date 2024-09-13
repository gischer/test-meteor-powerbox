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
let Axios;
module.link("axios", {
  default(v) {
    Axios = v;
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
  Axios({
    proxy: {
      protocol: proxyParsed[1],
      host: proxyParsed[2],
      port: Number(proxyParsed[3])
    },
    method: "POST",
    url: "http://http-bridge/session/".concat(ssInfo.sessionId, "/claim"),
    data: {
      "requestToken": claimToken,
      "requiredPermissions": []
    }
  }).then(function (response) {
    console.log('setting access token');
    console.log(response.data);
    accessToken = response.data.cap;
  }).catch(error => {
    console.error(error);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9zdGFydHVwL2JvdGgvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXIvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL3Bvd2VyYm94LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWFpbi5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJsaW5rIiwiTWV0ZW9yIiwidiIsImhlYWRlcnMiLCJBeGlvcyIsImRlZmF1bHQiLCJhY2Nlc3NUb2tlbiIsInNlc3Npb25JZCIsInVybFJlZ2V4IiwiaXNTZXJ2ZXIiLCJtZXRob2RzIiwiY2xhaW1Ub2tlbiIsInNlbGYiLCJjb25zb2xlIiwibG9nIiwiZ2V0IiwiZ2V0QWNjZXNzVG9rZW4iLCJwcm94eVBhcnNlZCIsInByb2Nlc3MiLCJlbnYiLCJIVFRQX1BST1hZIiwibWF0Y2giLCJyZXF1ZXN0RGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZXNEYXRhIiwicHJveHkiLCJwcm90b2NvbCIsImhvc3QiLCJwb3J0IiwiTnVtYmVyIiwibWV0aG9kIiwidXJsIiwic3NJbmZvIiwiZGF0YSIsInRoZW4iLCJyZXNwb25zZSIsImNhcCIsImNhdGNoIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQSx3Qzs7Ozs7Ozs7Ozs7QUNEQUEsTUFBTSxDQUFDQyxJQUFQLENBQVksdUJBQVo7QUFBcUNELE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLHlCQUFaO0FBQXVDRCxNQUFNLENBQUNDLElBQVAsQ0FBWSx1QkFBWixFOzs7Ozs7Ozs7OztBQ0E1RSxJQUFJQyxNQUFKO0FBQVdGLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLGVBQVosRUFBNEI7QUFBQ0MsUUFBTSxDQUFDQyxDQUFELEVBQUc7QUFBQ0QsVUFBTSxHQUFDQyxDQUFQO0FBQVM7O0FBQXBCLENBQTVCLEVBQWtELENBQWxEO0FBQXFELElBQUlDLE9BQUo7QUFBWUosTUFBTSxDQUFDQyxJQUFQLENBQVksMEJBQVosRUFBdUM7QUFBQ0csU0FBTyxDQUFDRCxDQUFELEVBQUc7QUFBQ0MsV0FBTyxHQUFDRCxDQUFSO0FBQVU7O0FBQXRCLENBQXZDLEVBQStELENBQS9EO0FBQWtFLElBQUlFLEtBQUo7QUFBVUwsTUFBTSxDQUFDQyxJQUFQLENBQVksT0FBWixFQUFvQjtBQUFDSyxTQUFPLENBQUNILENBQUQsRUFBRztBQUFDRSxTQUFLLEdBQUNGLENBQU47QUFBUTs7QUFBcEIsQ0FBcEIsRUFBMEMsQ0FBMUM7QUFJeEosSUFBSUksV0FBSjtBQUNBLElBQUlDLFNBQUo7QUFDQSxNQUFNQyxRQUFRLEdBQUcsdUNBQWpCOztBQUVBLElBQUlQLE1BQU0sQ0FBQ1EsUUFBWCxFQUFxQjtBQUNwQlIsUUFBTSxDQUFDUyxPQUFQLENBQWU7QUFDZCxpQ0FBNkJDLFVBQTdCLEVBQXlDO0FBQ3hDLFlBQU1DLElBQUksR0FBRyxJQUFiO0FBQ0FDLGFBQU8sQ0FBQ0MsR0FBUix3QkFBNEJILFVBQTVCO0FBQ0FKLGVBQVMsR0FBR0osT0FBTyxDQUFDWSxHQUFSLENBQVlILElBQVosRUFBa0Isd0JBQWxCLENBQVo7QUFDQUMsYUFBTyxDQUFDQyxHQUFSLHVCQUEyQlAsU0FBM0I7O0FBQ0EsVUFBSU4sTUFBTSxDQUFDUSxRQUFYLEVBQXFCO0FBQ3BCTyxzQkFBYyxDQUFDTCxVQUFELENBQWQ7QUFDQSxPQUZELE1BRU87QUFDTkUsZUFBTyxDQUFDQyxHQUFSLENBQVksc0JBQVo7QUFDQTtBQUNEOztBQVhhLEdBQWY7QUFhQTs7QUFFRCxTQUFTRSxjQUFULENBQXdCTCxVQUF4QixFQUFvQztBQUNuQyxRQUFNTSxXQUFXLEdBQUdDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxVQUFaLENBQXVCQyxLQUF2QixDQUE2QmIsUUFBN0IsQ0FBcEI7QUFDQSxRQUFNYyxXQUFXLEdBQUdDLElBQUksQ0FBQ0MsU0FBTCxDQUFlO0FBQ2xDLG9CQUFnQmIsVUFEa0I7QUFFbEMsMkJBQXVCO0FBRlcsR0FBZixDQUFwQjtBQUlBLE1BQUljLE9BQU8sR0FBRyxFQUFkO0FBQ0FyQixPQUFLLENBQUM7QUFDRHNCLFNBQUssRUFBRTtBQUNMQyxjQUFRLEVBQUVWLFdBQVcsQ0FBQyxDQUFELENBRGhCO0FBRUxXLFVBQUksRUFBRVgsV0FBVyxDQUFDLENBQUQsQ0FGWjtBQUdMWSxVQUFJLEVBQUVDLE1BQU0sQ0FBQ2IsV0FBVyxDQUFDLENBQUQsQ0FBWjtBQUhQLEtBRE47QUFNRGMsVUFBTSxFQUFFLE1BTlA7QUFPREMsT0FBRyx1Q0FBZ0NDLE1BQU0sQ0FBQzFCLFNBQXZDLFdBUEY7QUFRRDJCLFFBQUksRUFBRTtBQUNKLHNCQUFnQnZCLFVBRFo7QUFFSiw2QkFBdUI7QUFGbkI7QUFSTCxHQUFELENBQUwsQ0FhSXdCLElBYkosQ0FhUyxVQUFTQyxRQUFULEVBQW1CO0FBQ3ZCdkIsV0FBTyxDQUFDQyxHQUFSLENBQVksc0JBQVo7QUFDQUQsV0FBTyxDQUFDQyxHQUFSLENBQVlzQixRQUFRLENBQUNGLElBQXJCO0FBQ0E1QixlQUFXLEdBQUc4QixRQUFRLENBQUNGLElBQVQsQ0FBY0csR0FBNUI7QUFDRCxHQWpCSixFQWtCSUMsS0FsQkosQ0FrQldDLEtBQUQsSUFBVztBQUFDMUIsV0FBTyxDQUFDMEIsS0FBUixDQUFjQSxLQUFkO0FBQXFCLEdBbEIzQztBQW9CQSxDOzs7Ozs7Ozs7OztBQ25ERHhDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLHlCQUFaO0FBQXVDRCxNQUFNLENBQUNDLElBQVAsQ0FBWSx1QkFBWixFIiwiZmlsZSI6Ii9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnQgbW9kdWxlcyB1c2VkIGJ5IGJvdGggY2xpZW50IGFuZCBzZXJ2ZXIgdGhyb3VnaCBhIHNpbmdsZSBpbmRleCBlbnRyeSBwb2ludFxuLy8gZS5nLiB1c2VyYWNjb3VudHMgY29uZmlndXJhdGlvbiBmaWxlLlxuIiwiLy8gSW1wb3J0IHNlcnZlciBzdGFydHVwIHRocm91Z2ggYSBzaW5nbGUgaW5kZXggZW50cnkgcG9pbnRcblxuaW1wb3J0ICcvaW1wb3J0cy9zdGFydHVwL2JvdGgnO1xuaW1wb3J0ICcvaW1wb3J0cy9zdGFydHVwL3NlcnZlcic7XG5pbXBvcnQgJy9pbXBvcnRzL2FwaS9wb3dlcmJveCc7IiwiaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSAnbWV0ZW9yL2dhZGljb2hlbjpoZWFkZXJzJztcbmltcG9ydCBBeGlvcyBmcm9tICdheGlvcyc7XG5cbnZhciBhY2Nlc3NUb2tlbjtcbnZhciBzZXNzaW9uSWQ7XG5jb25zdCB1cmxSZWdleCA9IC8oW2EtejAtOV0rKTpcXC9cXC8oW2EtejAtOVxcLl0rKTooW1xcZF0rKS87XG5cbmlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcblx0TWV0ZW9yLm1ldGhvZHMoe1xuXHRcdFwic2FuZHN0b3JtLnN1Ym1pdENsYWltVG9rZW5cIihjbGFpbVRva2VuKSB7XG5cdFx0XHRjb25zdCBzZWxmID0gdGhpcztcblx0XHRcdGNvbnNvbGUubG9nKGBjbGFpbVRva2VuID0gJHtjbGFpbVRva2VufWApO1xuXHRcdFx0c2Vzc2lvbklkID0gaGVhZGVycy5nZXQoc2VsZiwgJ3gtc2FuZHN0b3JtLXNlc3Npb24taWQnKTtcblx0XHRcdGNvbnNvbGUubG9nKGBzZXNzaW9uSWQgPSAke3Nlc3Npb25JZH1gKTtcblx0XHRcdGlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcblx0XHRcdFx0Z2V0QWNjZXNzVG9rZW4oY2xhaW1Ub2tlbik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnZ2V0dGluZyBhY2Nlc3MgdG9rZW4nKVxuXHRcdFx0fVxuXHRcdH1cblx0fSlcbn1cblxuZnVuY3Rpb24gZ2V0QWNjZXNzVG9rZW4oY2xhaW1Ub2tlbikge1xuXHRjb25zdCBwcm94eVBhcnNlZCA9IHByb2Nlc3MuZW52LkhUVFBfUFJPWFkubWF0Y2godXJsUmVnZXgpO1xuXHRjb25zdCByZXF1ZXN0RGF0YSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcInJlcXVlc3RUb2tlblwiOiBjbGFpbVRva2VuLFxuXHRcdFwicmVxdWlyZWRQZXJtaXNzaW9uc1wiOiBbXSxcblx0fSk7XG5cdHZhciByZXNEYXRhID0gXCJcIjtcblx0QXhpb3Moe1xuICAgICAgcHJveHk6IHtcbiAgICAgICAgcHJvdG9jb2w6IHByb3h5UGFyc2VkWzFdLFxuICAgICAgICBob3N0OiBwcm94eVBhcnNlZFsyXSxcbiAgICAgICAgcG9ydDogTnVtYmVyKHByb3h5UGFyc2VkWzNdKSxcbiAgICAgIH0sXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdXJsOiBgaHR0cDovL2h0dHAtYnJpZGdlL3Nlc3Npb24vJHtzc0luZm8uc2Vzc2lvbklkfS9jbGFpbWAsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIFwicmVxdWVzdFRva2VuXCI6IGNsYWltVG9rZW4sXG4gICAgICAgIFwicmVxdWlyZWRQZXJtaXNzaW9uc1wiOiBbXSxcbiAgICAgIH1cbiAgICB9KVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICBjb25zb2xlLmxvZygnc2V0dGluZyBhY2Nlc3MgdG9rZW4nKTtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgYWNjZXNzVG9rZW4gPSByZXNwb25zZS5kYXRhLmNhcDtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtjb25zb2xlLmVycm9yKGVycm9yKX0pXG5cbn0iLCIvLyBTZXJ2ZXIgZW50cnkgcG9pbnQsIGltcG9ydHMgYWxsIHNlcnZlciBjb2RlXG5cbmltcG9ydCAnL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXInO1xuaW1wb3J0ICcvaW1wb3J0cy9zdGFydHVwL2JvdGgnO1xuIl19
