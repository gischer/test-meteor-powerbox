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
const testUrl = 'https:/35.192.197.33/primaries/AspiringZealotPrimary.jpeg';

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
  dns.lookup('sot-images.sweetvinesystems.com', function (err, address, family) {
    if (err) {
      console.log("Error: " + err);
    } else {
      console.log(address);
    }
  });
  if (!accessToken) return;
  console.log("fetchImage");
  console.log(accessToken);
  const proxyParsed = process.env.HTTP_PROXY.match(urlRegex);
  Axios({
    proxy: {
      protocol: proxyParsed[1],
      host: proxyParsed[2],
      port: Number(proxyParsed[3])
    },
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9zdGFydHVwL2JvdGgvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXIvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL3Bvd2VyYm94LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWFpbi5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJsaW5rIiwiTWV0ZW9yIiwidiIsImhlYWRlcnMiLCJBeGlvcyIsImRlZmF1bHQiLCJkbnMiLCJhY2Nlc3NUb2tlbiIsInNlc3Npb25JZCIsInVybFJlZ2V4IiwidGVzdFVybCIsImlzU2VydmVyIiwibWV0aG9kcyIsImNsYWltVG9rZW4iLCJzZWxmIiwiY29uc29sZSIsImxvZyIsImdldCIsImdldEFjY2Vzc1Rva2VuIiwiZmV0Y2hJbWFnZSIsInByb3h5UGFyc2VkIiwicHJvY2VzcyIsImVudiIsIkhUVFBfUFJPWFkiLCJtYXRjaCIsInJlcXVlc3REYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlc0RhdGEiLCJwcm94eSIsInByb3RvY29sIiwiaG9zdCIsInBvcnQiLCJOdW1iZXIiLCJtZXRob2QiLCJ1cmwiLCJkYXRhIiwidGhlbiIsInJlc3BvbnNlIiwiY2FwIiwiY2F0Y2giLCJlcnJvciIsImxvb2t1cCIsImVyciIsImFkZHJlc3MiLCJmYW1pbHkiLCJsZW5ndGgiLCJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0Esd0M7Ozs7Ozs7Ozs7O0FDREFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLHVCQUFaO0FBQXFDRCxNQUFNLENBQUNDLElBQVAsQ0FBWSx5QkFBWjtBQUF1Q0QsTUFBTSxDQUFDQyxJQUFQLENBQVksdUJBQVosRTs7Ozs7Ozs7Ozs7QUNBNUUsSUFBSUMsTUFBSjtBQUFXRixNQUFNLENBQUNDLElBQVAsQ0FBWSxlQUFaLEVBQTRCO0FBQUNDLFFBQU0sQ0FBQ0MsQ0FBRCxF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QUFXO0FBQ2pCMUIsV0FBTyxDQUFDQyxHQUFSLENBQVl5QixLQUFLLENBQUNNLE9BQWxCO0FBQ0EsR0FoQkQ7QUFpQkEsQzs7Ozs7Ozs7Ozs7QUM3RkRoRCxNQUFNLENBQUNDLElBQVAsQ0FBWSx5QkFBWjtBQUF1Q0QsTUFBTSxDQUFDQyxJQUFQLENBQVksdUJBQVosRSIsImZpbGUiOiIvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0IG1vZHVsZXMgdXNlZCBieSBib3RoIGNsaWVudCBhbmQgc2VydmVyIHRocm91Z2ggYSBzaW5nbGUgaW5kZXggZW50cnkgcG9pbnRcbi8vIGUuZy4gdXNlcmFjY291bnRzIGNvbmZpZ3VyYXRpb24gZmlsZS5cbiIsIi8vIEltcG9ydCBzZXJ2ZXIgc3RhcnR1cCB0aHJvdWdoIGEgc2luZ2xlIGluZGV4IGVudHJ5IHBvaW50XG5cbmltcG9ydCAnL2ltcG9ydHMvc3RhcnR1cC9ib3RoJztcbmltcG9ydCAnL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXInO1xuaW1wb3J0ICcvaW1wb3J0cy9hcGkvcG93ZXJib3gnOyIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IHsgaGVhZGVycyB9IGZyb20gJ21ldGVvci9nYWRpY29oZW46aGVhZGVycyc7XG5pbXBvcnQgQXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IGRucyBmcm9tICdkbnMnO1xuXG52YXIgYWNjZXNzVG9rZW47XG52YXIgc2Vzc2lvbklkO1xuY29uc3QgdXJsUmVnZXggPSAvKFthLXowLTldKyk6XFwvXFwvKFthLXowLTlcXC5dKyk6KFtcXGRdKykvO1xuY29uc3QgdGVzdFVybCA9ICdodHRwczovMzUuMTkyLjE5Ny4zMy9wcmltYXJpZXMvQXNwaXJpbmdaZWFsb3RQcmltYXJ5LmpwZWcnO1xuXG5pZiAoTWV0ZW9yLmlzU2VydmVyKSB7XG5cdE1ldGVvci5tZXRob2RzKHtcblx0XHRcInNhbmRzdG9ybS5zdWJtaXRDbGFpbVRva2VuXCIoY2xhaW1Ub2tlbikge1xuXHRcdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0XHRjb25zb2xlLmxvZyhgY2xhaW1Ub2tlbiA9ICR7Y2xhaW1Ub2tlbn1gKTtcblx0XHRcdHNlc3Npb25JZCA9IGhlYWRlcnMuZ2V0KHNlbGYsICd4LXNhbmRzdG9ybS1zZXNzaW9uLWlkJyk7XG5cdFx0XHRjb25zb2xlLmxvZyhgc2Vzc2lvbklkID0gJHtzZXNzaW9uSWR9YCk7XG5cdFx0XHRpZiAoTWV0ZW9yLmlzU2VydmVyKSB7XG5cdFx0XHRcdGdldEFjY2Vzc1Rva2VuKGNsYWltVG9rZW4pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2dldHRpbmcgYWNjZXNzIHRva2VuJylcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0XCJzYW5kc3Rvcm0uZmV0Y2hJbWFnZVwiKCkge1xuXHRcdFx0aWYgKE1ldGVvci5pc1NlcnZlcikge1xuXHRcdFx0XHRmZXRjaEltYWdlKGFjY2Vzc1Rva2VuKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdmZXRjaGluZyBpbWFnZScpO1xuXHRcdFx0fVxuXG5cdFx0fVxuXHR9KVxufVxuXG5mdW5jdGlvbiBnZXRBY2Nlc3NUb2tlbihjbGFpbVRva2VuKSB7XG5cdGNvbnN0IHByb3h5UGFyc2VkID0gcHJvY2Vzcy5lbnYuSFRUUF9QUk9YWS5tYXRjaCh1cmxSZWdleCk7XG5cdGNvbnN0IHJlcXVlc3REYXRhID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFwicmVxdWVzdFRva2VuXCI6IGNsYWltVG9rZW4sXG5cdFx0XCJyZXF1aXJlZFBlcm1pc3Npb25zXCI6IFtdLFxuXHR9KTtcblx0dmFyIHJlc0RhdGEgPSBcIlwiO1xuXHRBeGlvcyh7XG5cdFx0cHJveHk6IHtcblx0XHRcdHByb3RvY29sOiBwcm94eVBhcnNlZFsxXSxcblx0XHRcdGhvc3Q6IHByb3h5UGFyc2VkWzJdLFxuXHRcdFx0cG9ydDogTnVtYmVyKHByb3h5UGFyc2VkWzNdKSxcblx0XHR9LFxuXHRcdG1ldGhvZDogXCJQT1NUXCIsXG5cdFx0dXJsOiBgaHR0cDovL2h0dHAtYnJpZGdlL3Nlc3Npb24vJHtzZXNzaW9uSWR9L2NsYWltYCxcblx0XHRkYXRhOiB7XG5cdFx0XHRcInJlcXVlc3RUb2tlblwiOiBjbGFpbVRva2VuLFxuXHRcdFx0XCJyZXF1aXJlZFBlcm1pc3Npb25zXCI6IFtdLFxuXHRcdH1cblx0fSlcblx0LnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0XHRjb25zb2xlLmxvZygnc2V0dGluZyBhY2Nlc3MgdG9rZW4nKTtcblx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhKTtcblx0XHRhY2Nlc3NUb2tlbiA9IHJlc3BvbnNlLmRhdGEuY2FwO1xuXHR9KVxuXHQuY2F0Y2goKGVycm9yKSA9PiB7Y29uc29sZS5lcnJvcihlcnJvcil9KVxuXG59O1xuXG5mdW5jdGlvbiBmZXRjaEltYWdlKGFjY2Vzc1Rva2VuKSB7XG5cdGRucy5sb29rdXAoJ3NvdC1pbWFnZXMuc3dlZXR2aW5lc3lzdGVtcy5jb20nLCBmdW5jdGlvbihlcnIsIGFkZHJlc3MsIGZhbWlseSkge1xuXHRcdGlmIChlcnIpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc29sZS5sb2coYWRkcmVzcyk7XG5cdFx0fVxuXHR9KTtcblx0aWYgKCFhY2Nlc3NUb2tlbikgcmV0dXJuO1xuXHRjb25zb2xlLmxvZyhcImZldGNoSW1hZ2VcIik7XG5cdGNvbnNvbGUubG9nKGFjY2Vzc1Rva2VuKTtcblx0Y29uc3QgcHJveHlQYXJzZWQgPSBwcm9jZXNzLmVudi5IVFRQX1BST1hZLm1hdGNoKHVybFJlZ2V4KTtcblx0QXhpb3Moe1xuXHRcdHByb3h5OiB7XG5cdFx0XHRwcm90b2NvbDogcHJveHlQYXJzZWRbMV0sXG5cdFx0XHRob3N0OiBwcm94eVBhcnNlZFsyXSxcblx0XHRcdHBvcnQ6IE51bWJlcihwcm94eVBhcnNlZFszXSksXG5cdFx0fSxcblx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdHVybDogdGVzdFVybCxcblx0XHRoZWFkZXJzOiB7J0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7YWNjZXNzVG9rZW59YH1cblx0fSlcblx0LnRoZW4oKHJlc3BvbnNlID0+IHtcblx0XHRjb25zb2xlLmxvZygnc3VjY2Vzc2Z1bCByZXNwb25zZScpO1xuXHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEubGVuZ3RoKTtcblx0fSkpXG5cdC5jYXRjaCgoZXJyb3IpID0+IHtcblx0XHRjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcblx0fSk7XG59IiwiLy8gU2VydmVyIGVudHJ5IHBvaW50LCBpbXBvcnRzIGFsbCBzZXJ2ZXIgY29kZVxuXG5pbXBvcnQgJy9pbXBvcnRzL3N0YXJ0dXAvc2VydmVyJztcbmltcG9ydCAnL2ltcG9ydHMvc3RhcnR1cC9ib3RoJztcbiJdfQ==
