var require = meteorInstall({"imports":{"startup":{"both":{"index.js":function module(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// imports/startup/both/index.js                                                                //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
// Import modules used by both client and server through a single index entry point
// e.g. useraccounts configuration file.
//////////////////////////////////////////////////////////////////////////////////////////////////

}},"server":{"index.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// imports/startup/server/index.js                                                              //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
module.link("/imports/startup/both");
module.link("/imports/startup/server");
module.link("/imports/api/powerbox");
//////////////////////////////////////////////////////////////////////////////////////////////////

}}},"api":{"powerbox.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// imports/api/powerbox.js                                                                      //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
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
const testUrl = 'https://sot-images.sweetvinesystems.com/primaries/AspiringZealotPrimary.jpeg';

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
  if (!accessToken) return;
  Axios.get(testUrl, {
    'headers': {
      'Authorization': "Bearer ".concat(accessToken)
    }
  }).then(response => {
    console.log('successful response');
    console.log(response.data.length);
  }).catch(error => {
    console.log(error);
  });
}
//////////////////////////////////////////////////////////////////////////////////////////////////

}}},"server":{"main.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// server/main.js                                                                               //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
module.link("/imports/startup/server");
module.link("/imports/startup/both");
//////////////////////////////////////////////////////////////////////////////////////////////////

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9zdGFydHVwL2JvdGgvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXIvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL3Bvd2VyYm94LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWFpbi5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJsaW5rIiwiTWV0ZW9yIiwidiIsImhlYWRlcnMiLCJBeGlvcyIsImRlZmF1bHQiLCJhY2Nlc3NUb2tlbiIsInNlc3Npb25JZCIsInVybFJlZ2V4IiwidGVzdFVybCIsImlzU2VydmVyIiwibWV0aG9kcyIsImNsYWltVG9rZW4iLCJzZWxmIiwiY29uc29sZSIsImxvZyIsImdldCIsImdldEFjY2Vzc1Rva2VuIiwiZmV0Y2hJbWFnZSIsInByb3h5UGFyc2VkIiwicHJvY2VzcyIsImVudiIsIkhUVFBfUFJPWFkiLCJtYXRjaCIsInJlcXVlc3REYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlc0RhdGEiLCJwcm94eSIsInByb3RvY29sIiwiaG9zdCIsInBvcnQiLCJOdW1iZXIiLCJtZXRob2QiLCJ1cmwiLCJkYXRhIiwidGhlbiIsInJlc3BvbnNlIiwiY2FwIiwiY2F0Y2giLCJlcnJvciIsImxlbmd0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBLHdDOzs7Ozs7Ozs7OztBQ0RBQSxNQUFNLENBQUNDLElBQVAsQ0FBWSx1QkFBWjtBQUFxQ0QsTUFBTSxDQUFDQyxJQUFQLENBQVkseUJBQVo7QUFBdUNELE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLHVCQUFaLEU7Ozs7Ozs7Ozs7O0FDQTVFLElBQUlDLE1BQUo7QUFBV0YsTUFBTSxDQUFDQyxJQUFQLENBQVksZUFBWixFQUE0QjtBQUFDQyxRQUFNLENBQUNDLENBQUQsRUFBRztBQUFDRCxVQUFNLEdBQUNDLENBQVA7QUFBUzs7QUFBcEIsQ0FBNUIsRUFBa0Qs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QUEyQkgsV0FBM0I7QUFBRDtBQUFaLEdBQW5CLEVBQ0M4QixJQURELENBQ09DLFFBQVEsSUFBSTtBQUNsQnZCLFdBQU8sQ0FBQ0MsR0FBUixDQUFZLHFCQUFaO0FBQ0FELFdBQU8sQ0FBQ0MsR0FBUixDQUFZc0IsUUFBUSxDQUFDRixJQUFULENBQWNNLE1BQTFCO0FBQ0EsR0FKRCxFQUtDRixLQUxELENBS1FDLEtBQUQsSUFBVztBQUNqQjFCLFdBQU8sQ0FBQ0MsR0FBUixDQUFZeUIsS0FBWjtBQUNBLEdBUEQ7QUFRQSxDOzs7Ozs7Ozs7OztBQ3pFRHpDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLHlCQUFaO0FBQXVDRCxNQUFNLENBQUNDLElBQVAsQ0FBWSx1QkFBWixFIiwiZmlsZSI6Ii9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnQgbW9kdWxlcyB1c2VkIGJ5IGJvdGggY2xpZW50IGFuZCBzZXJ2ZXIgdGhyb3VnaCBhIHNpbmdsZSBpbmRleCBlbnRyeSBwb2ludFxuLy8gZS5nLiB1c2VyYWNjb3VudHMgY29uZmlndXJhdGlvbiBmaWxlLlxuIiwiLy8gSW1wb3J0IHNlcnZlciBzdGFydHVwIHRocm91Z2ggYSBzaW5nbGUgaW5kZXggZW50cnkgcG9pbnRcblxuaW1wb3J0ICcvaW1wb3J0cy9zdGFydHVwL2JvdGgnO1xuaW1wb3J0ICcvaW1wb3J0cy9zdGFydHVwL3NlcnZlcic7XG5pbXBvcnQgJy9pbXBvcnRzL2FwaS9wb3dlcmJveCc7IiwiaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5pbXBvcnQgeyBoZWFkZXJzIH0gZnJvbSAnbWV0ZW9yL2dhZGljb2hlbjpoZWFkZXJzJztcbmltcG9ydCBBeGlvcyBmcm9tICdheGlvcyc7XG5cbnZhciBhY2Nlc3NUb2tlbjtcbnZhciBzZXNzaW9uSWQ7XG5jb25zdCB1cmxSZWdleCA9IC8oW2EtejAtOV0rKTpcXC9cXC8oW2EtejAtOVxcLl0rKTooW1xcZF0rKS87XG5jb25zdCB0ZXN0VXJsID0gJ2h0dHBzOi8vc290LWltYWdlcy5zd2VldHZpbmVzeXN0ZW1zLmNvbS9wcmltYXJpZXMvQXNwaXJpbmdaZWFsb3RQcmltYXJ5LmpwZWcnO1xuXG5pZiAoTWV0ZW9yLmlzU2VydmVyKSB7XG5cdE1ldGVvci5tZXRob2RzKHtcblx0XHRcInNhbmRzdG9ybS5zdWJtaXRDbGFpbVRva2VuXCIoY2xhaW1Ub2tlbikge1xuXHRcdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0XHRjb25zb2xlLmxvZyhgY2xhaW1Ub2tlbiA9ICR7Y2xhaW1Ub2tlbn1gKTtcblx0XHRcdHNlc3Npb25JZCA9IGhlYWRlcnMuZ2V0KHNlbGYsICd4LXNhbmRzdG9ybS1zZXNzaW9uLWlkJyk7XG5cdFx0XHRjb25zb2xlLmxvZyhgc2Vzc2lvbklkID0gJHtzZXNzaW9uSWR9YCk7XG5cdFx0XHRpZiAoTWV0ZW9yLmlzU2VydmVyKSB7XG5cdFx0XHRcdGdldEFjY2Vzc1Rva2VuKGNsYWltVG9rZW4pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2dldHRpbmcgYWNjZXNzIHRva2VuJylcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0XCJzYW5kc3Rvcm0uZmV0Y2hJbWFnZVwiKCkge1xuXHRcdFx0aWYgKE1ldGVvci5pc1NlcnZlcikge1xuXHRcdFx0XHRmZXRjaEltYWdlKGFjY2Vzc1Rva2VuKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdmZXRjaGluZyBpbWFnZScpO1xuXHRcdFx0fVxuXG5cdFx0fVxuXHR9KVxufVxuXG5mdW5jdGlvbiBnZXRBY2Nlc3NUb2tlbihjbGFpbVRva2VuKSB7XG5cdGNvbnN0IHByb3h5UGFyc2VkID0gcHJvY2Vzcy5lbnYuSFRUUF9QUk9YWS5tYXRjaCh1cmxSZWdleCk7XG5cdGNvbnN0IHJlcXVlc3REYXRhID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFwicmVxdWVzdFRva2VuXCI6IGNsYWltVG9rZW4sXG5cdFx0XCJyZXF1aXJlZFBlcm1pc3Npb25zXCI6IFtdLFxuXHR9KTtcblx0dmFyIHJlc0RhdGEgPSBcIlwiO1xuXHRBeGlvcyh7XG4gICAgICBwcm94eToge1xuICAgICAgICBwcm90b2NvbDogcHJveHlQYXJzZWRbMV0sXG4gICAgICAgIGhvc3Q6IHByb3h5UGFyc2VkWzJdLFxuICAgICAgICBwb3J0OiBOdW1iZXIocHJveHlQYXJzZWRbM10pLFxuICAgICAgfSxcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6IGBodHRwOi8vaHR0cC1icmlkZ2Uvc2Vzc2lvbi8ke3Nlc3Npb25JZH0vY2xhaW1gLFxuICAgICAgZGF0YToge1xuICAgICAgICBcInJlcXVlc3RUb2tlblwiOiBjbGFpbVRva2VuLFxuICAgICAgICBcInJlcXVpcmVkUGVybWlzc2lvbnNcIjogW10sXG4gICAgICB9XG4gICAgfSlcbiAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgY29uc29sZS5sb2coJ3NldHRpbmcgYWNjZXNzIHRva2VuJyk7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhKTtcbiAgICAgIGFjY2Vzc1Rva2VuID0gcmVzcG9uc2UuZGF0YS5jYXA7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7Y29uc29sZS5lcnJvcihlcnJvcil9KVxuXG59O1xuXG5mdW5jdGlvbiBmZXRjaEltYWdlKGFjY2Vzc1Rva2VuKSB7XG5cdGlmICghYWNjZXNzVG9rZW4pIHJldHVybjtcblx0QXhpb3MuZ2V0KHRlc3RVcmwsIHsnaGVhZGVycyc6IHsnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHthY2Nlc3NUb2tlbn1gfX0pXG5cdC50aGVuKChyZXNwb25zZSA9PiB7XG5cdFx0Y29uc29sZS5sb2coJ3N1Y2Nlc3NmdWwgcmVzcG9uc2UnKTtcblx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhLmxlbmd0aCk7XG5cdH0pKVxuXHQuY2F0Y2goKGVycm9yKSA9PiB7XG5cdFx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHR9KTtcbn0iLCIvLyBTZXJ2ZXIgZW50cnkgcG9pbnQsIGltcG9ydHMgYWxsIHNlcnZlciBjb2RlXG5cbmltcG9ydCAnL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXInO1xuaW1wb3J0ICcvaW1wb3J0cy9zdGFydHVwL2JvdGgnO1xuIl19
