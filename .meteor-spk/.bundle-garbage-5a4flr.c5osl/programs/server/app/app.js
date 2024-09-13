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
let dns;
module.link("dns", {
  default(v) {
    dns = v;
  }

}, 3);
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
  dns.lookup('sot-images.sweetvinesystems.com', function (err, address, family) {
    if (err) {
      console.log("Error: " + err);
    } else {
      console.log(address);
    }
  });
  if (!accessToken) return;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9zdGFydHVwL2JvdGgvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXIvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL3Bvd2VyYm94LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWFpbi5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJsaW5rIiwiTWV0ZW9yIiwidiIsImhlYWRlcnMiLCJBeGlvcyIsImRlZmF1bHQiLCJkbnMiLCJhY2Nlc3NUb2tlbiIsInNlc3Npb25JZCIsInVybFJlZ2V4IiwidGVzdFVybCIsImlzU2VydmVyIiwibWV0aG9kcyIsImNsYWltVG9rZW4iLCJzZWxmIiwiY29uc29sZSIsImxvZyIsImdldCIsImdldEFjY2Vzc1Rva2VuIiwiZmV0Y2hJbWFnZSIsInByb3h5UGFyc2VkIiwicHJvY2VzcyIsImVudiIsIkhUVFBfUFJPWFkiLCJtYXRjaCIsInJlcXVlc3REYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlc0RhdGEiLCJwcm94eSIsInByb3RvY29sIiwiaG9zdCIsInBvcnQiLCJOdW1iZXIiLCJtZXRob2QiLCJ1cmwiLCJkYXRhIiwidGhlbiIsInJlc3BvbnNlIiwiY2FwIiwiY2F0Y2giLCJlcnJvciIsImxvb2t1cCIsImVyciIsImFkZHJlc3MiLCJmYW1pbHkiLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQSx3Qzs7Ozs7Ozs7Ozs7QUNEQUEsTUFBTSxDQUFDQyxJQUFQLENBQVksdUJBQVo7QUFBcUNELE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLHlCQUFaO0FBQXVDRCxNQUFNLENBQUNDLElBQVAsQ0FBWSx1QkFBWixFOzs7Ozs7Ozs7OztBQ0E1RSxJQUFJQyxNQUFKO0FBQVdGLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLGVBQVosRUFBNEI7QUFBQ0MsUUFBTSxDQUFDQyxDQUFELEVBQUc7QUFBQ0Qs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RkQxQyxNQUFNLENBQUNDLElBQVAsQ0FBWSx5QkFBWjtBQUF1Q0QsTUFBTSxDQUFDQyxJQUFQLENBQVksdUJBQVosRSIsImZpbGUiOiIvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0IG1vZHVsZXMgdXNlZCBieSBib3RoIGNsaWVudCBhbmQgc2VydmVyIHRocm91Z2ggYSBzaW5nbGUgaW5kZXggZW50cnkgcG9pbnRcbi8vIGUuZy4gdXNlcmFjY291bnRzIGNvbmZpZ3VyYXRpb24gZmlsZS5cbiIsIi8vIEltcG9ydCBzZXJ2ZXIgc3RhcnR1cCB0aHJvdWdoIGEgc2luZ2xlIGluZGV4IGVudHJ5IHBvaW50XG5cbmltcG9ydCAnL2ltcG9ydHMvc3RhcnR1cC9ib3RoJztcbmltcG9ydCAnL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXInO1xuaW1wb3J0ICcvaW1wb3J0cy9hcGkvcG93ZXJib3gnOyIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IHsgaGVhZGVycyB9IGZyb20gJ21ldGVvci9nYWRpY29oZW46aGVhZGVycyc7XG5pbXBvcnQgQXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IGRucyBmcm9tICdkbnMnO1xuXG52YXIgYWNjZXNzVG9rZW47XG52YXIgc2Vzc2lvbklkO1xuY29uc3QgdXJsUmVnZXggPSAvKFthLXowLTldKyk6XFwvXFwvKFthLXowLTlcXC5dKyk6KFtcXGRdKykvO1xuY29uc3QgdGVzdFVybCA9ICdodHRwczovL3NvdC1pbWFnZXMuc3dlZXR2aW5lc3lzdGVtcy5jb20vcHJpbWFyaWVzL0FzcGlyaW5nWmVhbG90UHJpbWFyeS5qcGVnJztcblxuaWYgKE1ldGVvci5pc1NlcnZlcikge1xuXHRNZXRlb3IubWV0aG9kcyh7XG5cdFx0XCJzYW5kc3Rvcm0uc3VibWl0Q2xhaW1Ub2tlblwiKGNsYWltVG9rZW4pIHtcblx0XHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXHRcdFx0Y29uc29sZS5sb2coYGNsYWltVG9rZW4gPSAke2NsYWltVG9rZW59YCk7XG5cdFx0XHRzZXNzaW9uSWQgPSBoZWFkZXJzLmdldChzZWxmLCAneC1zYW5kc3Rvcm0tc2Vzc2lvbi1pZCcpO1xuXHRcdFx0Y29uc29sZS5sb2coYHNlc3Npb25JZCA9ICR7c2Vzc2lvbklkfWApO1xuXHRcdFx0aWYgKE1ldGVvci5pc1NlcnZlcikge1xuXHRcdFx0XHRnZXRBY2Nlc3NUb2tlbihjbGFpbVRva2VuKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdnZXR0aW5nIGFjY2VzcyB0b2tlbicpXG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdFwic2FuZHN0b3JtLmZldGNoSW1hZ2VcIigpIHtcblx0XHRcdGlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcblx0XHRcdFx0ZmV0Y2hJbWFnZShhY2Nlc3NUb2tlbik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnZmV0Y2hpbmcgaW1hZ2UnKTtcblx0XHRcdH1cblxuXHRcdH1cblx0fSlcbn1cblxuZnVuY3Rpb24gZ2V0QWNjZXNzVG9rZW4oY2xhaW1Ub2tlbikge1xuXHRjb25zdCBwcm94eVBhcnNlZCA9IHByb2Nlc3MuZW52LkhUVFBfUFJPWFkubWF0Y2godXJsUmVnZXgpO1xuXHRjb25zdCByZXF1ZXN0RGF0YSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcInJlcXVlc3RUb2tlblwiOiBjbGFpbVRva2VuLFxuXHRcdFwicmVxdWlyZWRQZXJtaXNzaW9uc1wiOiBbXSxcblx0fSk7XG5cdHZhciByZXNEYXRhID0gXCJcIjtcblx0QXhpb3Moe1xuICAgICAgcHJveHk6IHtcbiAgICAgICAgcHJvdG9jb2w6IHByb3h5UGFyc2VkWzFdLFxuICAgICAgICBob3N0OiBwcm94eVBhcnNlZFsyXSxcbiAgICAgICAgcG9ydDogTnVtYmVyKHByb3h5UGFyc2VkWzNdKSxcbiAgICAgIH0sXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdXJsOiBgaHR0cDovL2h0dHAtYnJpZGdlL3Nlc3Npb24vJHtzZXNzaW9uSWR9L2NsYWltYCxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgXCJyZXF1ZXN0VG9rZW5cIjogY2xhaW1Ub2tlbixcbiAgICAgICAgXCJyZXF1aXJlZFBlcm1pc3Npb25zXCI6IFtdLFxuICAgICAgfVxuICAgIH0pXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdzZXR0aW5nIGFjY2VzcyB0b2tlbicpO1xuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSk7XG4gICAgICBhY2Nlc3NUb2tlbiA9IHJlc3BvbnNlLmRhdGEuY2FwO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge2NvbnNvbGUuZXJyb3IoZXJyb3IpfSlcblxufTtcblxuZnVuY3Rpb24gZmV0Y2hJbWFnZShhY2Nlc3NUb2tlbikge1xuXHRkbnMubG9va3VwKCdzb3QtaW1hZ2VzLnN3ZWV0dmluZXN5c3RlbXMuY29tJywgZnVuY3Rpb24oZXJyLCBhZGRyZXNzLCBmYW1pbHkpIHtcblx0XHRpZiAoZXJyKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnNvbGUubG9nKGFkZHJlc3MpO1xuXHRcdH1cblx0fSk7XG5cdGlmICghYWNjZXNzVG9rZW4pIHJldHVybjtcblx0Y29uc3QgcHJveHlQYXJzZWQgPSBwcm9jZXNzLmVudi5IVFRQX1BST1hZLm1hdGNoKHVybFJlZ2V4KTtcblx0QXhpb3Moe1xuXHRcdHByb3h5OiB7XG4gICAgICAgIFx0cHJvdG9jb2w6IHByb3h5UGFyc2VkWzFdLFxuICAgICAgICBcdGhvc3Q6IHByb3h5UGFyc2VkWzJdLFxuICAgICAgICBcdHBvcnQ6IE51bWJlcihwcm94eVBhcnNlZFszXSksXG4gICAgICBcdH0sXG4gICAgICBcdG1ldGhvZDogJ0dFVCcsXG4gICAgICBcdHVybDogdGVzdFVybCxcblx0XHRoZWFkZXJzOiB7J0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7YWNjZXNzVG9rZW59YH1cblx0fSlcblx0LnRoZW4oKHJlc3BvbnNlID0+IHtcblx0XHRjb25zb2xlLmxvZygnc3VjY2Vzc2Z1bCByZXNwb25zZScpO1xuXHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEubGVuZ3RoKTtcblx0fSkpXG5cdC5jYXRjaCgoZXJyb3IpID0+IHtcblx0XHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdH0pO1xufSIsIi8vIFNlcnZlciBlbnRyeSBwb2ludCwgaW1wb3J0cyBhbGwgc2VydmVyIGNvZGVcblxuaW1wb3J0ICcvaW1wb3J0cy9zdGFydHVwL3NlcnZlcic7XG5pbXBvcnQgJy9pbXBvcnRzL3N0YXJ0dXAvYm90aCc7XG4iXX0=
