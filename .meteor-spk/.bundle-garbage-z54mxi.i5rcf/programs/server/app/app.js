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
let dns;
module.link("dns", {
  default(v) {
    dns = v;
  }

}, 3);
var accessToken;
var sessionId;
const urlRegex = /([a-z0-9]+):\/\/([a-z0-9\.]+):([\d]+)/;
const testUrl = 'http:/35.192.197.33/primaries/AspiringZealotPrimary.jpeg';

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
    },

    "sandstorm.fetchImage"() {
      if (Meteor.isServer) {
        fetchImage(accessToken);
      } else {
        console.log('fetching image');
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
    url: "http://http-bridge/session/".concat(sessionId, "/claim"),
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

;

function fetchImage(accessToken) {
  /*
  dns.lookup('sot-images.sweetvinesystems.com', function(err, address, family) {
  	if (err) {
  		console.log("Error: " + err);
  	} else {
  		console.log(address);
  	}
  });
  */
  if (!accessToken) return;
  console.log("fetchImage");
  console.log(accessToken);
  const proxyParsed = process.env.HTTP_PROXY.match(urlRegex);
  Axios({
    /*
    proxy: {
    	protocol: proxyParsed[1],
    	host: proxyParsed[2],
    	port: Number(proxyParsed[3]),
    },
    */
    method: 'GET',
    url: testUrl,
    headers: {
      'Authorization': "Bearer ".concat(accessToken)
    }
  }).then(response => {
    console.log('successful response');
    console.log(response.data.length);
  }).catch(error => {
    console.log(error.message);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9zdGFydHVwL2JvdGgvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXIvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL3Bvd2VyYm94LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWFpbi5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJsaW5rIiwiTWV0ZW9yIiwidiIsImhlYWRlcnMiLCJBeGlvcyIsImRlZmF1bHQiLCJkbnMiLCJhY2Nlc3NUb2tlbiIsInNlc3Npb25JZCIsInVybFJlZ2V4IiwidGVzdFVybCIsImlzU2VydmVyIiwibWV0aG9kcyIsImNsYWltVG9rZW4iLCJzZWxmIiwiY29uc29sZSIsImxvZyIsImdldCIsImdldEFjY2Vzc1Rva2VuIiwiZmV0Y2hJbWFnZSIsInByb3h5UGFyc2VkIiwicHJvY2VzcyIsImVudiIsIkhUVFBfUFJPWFkiLCJtYXRjaCIsInJlcXVlc3REYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlc0RhdGEiLCJwcm94eSIsInByb3RvY29sIiwiaG9zdCIsInBvcnQiLCJOdW1iZXIiLCJtZXRob2QiLCJ1cmwiLCJkYXRhIiwidGhlbiIsInJlc3BvbnNlIiwiY2FwIiwiY2F0Y2giLCJlcnJvciIsImxlbmd0aCIsIm1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQSx3Qzs7Ozs7Ozs7Ozs7QUNEQUEsTUFBTSxDQUFDQyxJQUFQLENBQVksdUJBQVo7QUFBcUNELE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLHlCQUFaO0FBQXVDRCxNQUFNLENBQUNDLElBQVAsQ0FBWSx1QkFBWixFOzs7Ozs7Ozs7OztBQ0E1RSxJQUFJQyxNQUFKO0FBQVdGLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLGVBQVosRUFBNEI7QUFBQ0MsUUFBTSxDQUFDQyxDQUFELEVBQUc7QUFBQ0QsVUFBTSxHQUFDQyxDQUFQO0FBQVM7O0FB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ZDtBQUFxQixHQWxCeEM7QUFvQkE7O0FBQUE7O0FBRUQsU0FBU3RCLFVBQVQsQ0FBb0JaLFdBQXBCLEVBQWlDO0FBQ2hDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNDLE1BQUksQ0FBQ0EsV0FBTCxFQUFrQjtBQUNsQlEsU0FBTyxDQUFDQyxHQUFSLENBQVksWUFBWjtBQUNBRCxTQUFPLENBQUNDLEdBQVIsQ0FBWVQsV0FBWjtBQUNBLFFBQU1hLFdBQVcsR0FBR0MsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFVBQVosQ0FBdUJDLEtBQXZCLENBQTZCZixRQUE3QixDQUFwQjtBQUNBTCxPQUFLLENBQUM7QUFDTDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFOEIsVUFBTSxFQUFFLEtBUkg7QUFTTEMsT0FBRyxFQUFFekIsT0FUQTtBQVVMUCxXQUFPLEVBQUU7QUFBQyx3Q0FBMkJJLFdBQTNCO0FBQUQ7QUFWSixHQUFELENBQUwsQ0FZQzhCLElBWkQsQ0FZT0MsUUFBUSxJQUFJO0FBQ2xCdkIsV0FBTyxDQUFDQyxHQUFSLENBQVkscUJBQVo7QUFDQUQsV0FBTyxDQUFDQyxHQUFSLENBQVlzQixRQUFRLENBQUNGLElBQVQsQ0FBY00sTUFBMUI7QUFDQSxHQWZELEVBZ0JDRixLQWhCRCxDQWdCUUMsS0FBRCxJQUFXO0FBQ2pCMUIsV0FBTyxDQUFDQyxHQUFSLENBQVl5QixLQUFLLENBQUNFLE9BQWxCO0FBQ0EsR0FsQkQ7QUFtQkEsQzs7Ozs7Ozs7Ozs7QUNqR0Q1QyxNQUFNLENBQUNDLElBQVAsQ0FBWSx5QkFBWjtBQUF1Q0QsTUFBTSxDQUFDQyxJQUFQLENBQVksdUJBQVosRSIsImZpbGUiOiIvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0IG1vZHVsZXMgdXNlZCBieSBib3RoIGNsaWVudCBhbmQgc2VydmVyIHRocm91Z2ggYSBzaW5nbGUgaW5kZXggZW50cnkgcG9pbnRcbi8vIGUuZy4gdXNlcmFjY291bnRzIGNvbmZpZ3VyYXRpb24gZmlsZS5cbiIsIi8vIEltcG9ydCBzZXJ2ZXIgc3RhcnR1cCB0aHJvdWdoIGEgc2luZ2xlIGluZGV4IGVudHJ5IHBvaW50XG5cbmltcG9ydCAnL2ltcG9ydHMvc3RhcnR1cC9ib3RoJztcbmltcG9ydCAnL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXInO1xuaW1wb3J0ICcvaW1wb3J0cy9hcGkvcG93ZXJib3gnOyIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IHsgaGVhZGVycyB9IGZyb20gJ21ldGVvci9nYWRpY29oZW46aGVhZGVycyc7XG5pbXBvcnQgQXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IGRucyBmcm9tICdkbnMnO1xuXG52YXIgYWNjZXNzVG9rZW47XG52YXIgc2Vzc2lvbklkO1xuY29uc3QgdXJsUmVnZXggPSAvKFthLXowLTldKyk6XFwvXFwvKFthLXowLTlcXC5dKyk6KFtcXGRdKykvO1xuY29uc3QgdGVzdFVybCA9ICdodHRwOi8zNS4xOTIuMTk3LjMzL3ByaW1hcmllcy9Bc3BpcmluZ1plYWxvdFByaW1hcnkuanBlZyc7XG5cbmlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcblx0TWV0ZW9yLm1ldGhvZHMoe1xuXHRcdFwic2FuZHN0b3JtLnN1Ym1pdENsYWltVG9rZW5cIihjbGFpbVRva2VuKSB7XG5cdFx0XHRjb25zdCBzZWxmID0gdGhpcztcblx0XHRcdGNvbnNvbGUubG9nKGBjbGFpbVRva2VuID0gJHtjbGFpbVRva2VufWApO1xuXHRcdFx0c2Vzc2lvbklkID0gaGVhZGVycy5nZXQoc2VsZiwgJ3gtc2FuZHN0b3JtLXNlc3Npb24taWQnKTtcblx0XHRcdGNvbnNvbGUubG9nKGBzZXNzaW9uSWQgPSAke3Nlc3Npb25JZH1gKTtcblx0XHRcdGlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcblx0XHRcdFx0Z2V0QWNjZXNzVG9rZW4oY2xhaW1Ub2tlbik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnZ2V0dGluZyBhY2Nlc3MgdG9rZW4nKVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRcInNhbmRzdG9ybS5mZXRjaEltYWdlXCIoKSB7XG5cdFx0XHRpZiAoTWV0ZW9yLmlzU2VydmVyKSB7XG5cdFx0XHRcdGZldGNoSW1hZ2UoYWNjZXNzVG9rZW4pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2ZldGNoaW5nIGltYWdlJyk7XG5cdFx0XHR9XG5cblx0XHR9XG5cdH0pXG59XG5cbmZ1bmN0aW9uIGdldEFjY2Vzc1Rva2VuKGNsYWltVG9rZW4pIHtcblx0Y29uc3QgcHJveHlQYXJzZWQgPSBwcm9jZXNzLmVudi5IVFRQX1BST1hZLm1hdGNoKHVybFJlZ2V4KTtcblx0Y29uc3QgcmVxdWVzdERhdGEgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XCJyZXF1ZXN0VG9rZW5cIjogY2xhaW1Ub2tlbixcblx0XHRcInJlcXVpcmVkUGVybWlzc2lvbnNcIjogW10sXG5cdH0pO1xuXHR2YXIgcmVzRGF0YSA9IFwiXCI7XG5cdEF4aW9zKHtcblx0XHRwcm94eToge1xuXHRcdFx0cHJvdG9jb2w6IHByb3h5UGFyc2VkWzFdLFxuXHRcdFx0aG9zdDogcHJveHlQYXJzZWRbMl0sXG5cdFx0XHRwb3J0OiBOdW1iZXIocHJveHlQYXJzZWRbM10pLFxuXHRcdH0sXG5cdFx0bWV0aG9kOiBcIlBPU1RcIixcblx0XHR1cmw6IGBodHRwOi8vaHR0cC1icmlkZ2Uvc2Vzc2lvbi8ke3Nlc3Npb25JZH0vY2xhaW1gLFxuXHRcdGRhdGE6IHtcblx0XHRcdFwicmVxdWVzdFRva2VuXCI6IGNsYWltVG9rZW4sXG5cdFx0XHRcInJlcXVpcmVkUGVybWlzc2lvbnNcIjogW10sXG5cdFx0fVxuXHR9KVxuXHQudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdGNvbnNvbGUubG9nKCdzZXR0aW5nIGFjY2VzcyB0b2tlbicpO1xuXHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEpO1xuXHRcdGFjY2Vzc1Rva2VuID0gcmVzcG9uc2UuZGF0YS5jYXA7XG5cdH0pXG5cdC5jYXRjaCgoZXJyb3IpID0+IHtjb25zb2xlLmVycm9yKGVycm9yKX0pXG5cbn07XG5cbmZ1bmN0aW9uIGZldGNoSW1hZ2UoYWNjZXNzVG9rZW4pIHtcblx0Lypcblx0ZG5zLmxvb2t1cCgnc290LWltYWdlcy5zd2VldHZpbmVzeXN0ZW1zLmNvbScsIGZ1bmN0aW9uKGVyciwgYWRkcmVzcywgZmFtaWx5KSB7XG5cdFx0aWYgKGVycikge1xuXHRcdFx0Y29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnIpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLmxvZyhhZGRyZXNzKTtcblx0XHR9XG5cdH0pO1xuXHQqL1xuXHRpZiAoIWFjY2Vzc1Rva2VuKSByZXR1cm47XG5cdGNvbnNvbGUubG9nKFwiZmV0Y2hJbWFnZVwiKTtcblx0Y29uc29sZS5sb2coYWNjZXNzVG9rZW4pO1xuXHRjb25zdCBwcm94eVBhcnNlZCA9IHByb2Nlc3MuZW52LkhUVFBfUFJPWFkubWF0Y2godXJsUmVnZXgpO1xuXHRBeGlvcyh7XG5cdFx0Lypcblx0XHRwcm94eToge1xuXHRcdFx0cHJvdG9jb2w6IHByb3h5UGFyc2VkWzFdLFxuXHRcdFx0aG9zdDogcHJveHlQYXJzZWRbMl0sXG5cdFx0XHRwb3J0OiBOdW1iZXIocHJveHlQYXJzZWRbM10pLFxuXHRcdH0sXG5cdFx0Ki9cblx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdHVybDogdGVzdFVybCxcblx0XHRoZWFkZXJzOiB7J0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7YWNjZXNzVG9rZW59YH1cblx0fSlcblx0LnRoZW4oKHJlc3BvbnNlID0+IHtcblx0XHRjb25zb2xlLmxvZygnc3VjY2Vzc2Z1bCByZXNwb25zZScpO1xuXHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEubGVuZ3RoKTtcblx0fSkpXG5cdC5jYXRjaCgoZXJyb3IpID0+IHtcblx0XHRjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcblx0fSk7XG59IiwiLy8gU2VydmVyIGVudHJ5IHBvaW50LCBpbXBvcnRzIGFsbCBzZXJ2ZXIgY29kZVxuXG5pbXBvcnQgJy9pbXBvcnRzL3N0YXJ0dXAvc2VydmVyJztcbmltcG9ydCAnL2ltcG9ydHMvc3RhcnR1cC9ib3RoJztcbiJdfQ==
