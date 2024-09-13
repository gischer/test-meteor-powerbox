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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9zdGFydHVwL2JvdGgvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXIvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL3Bvd2VyYm94LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWFpbi5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJsaW5rIiwiTWV0ZW9yIiwidiIsImhlYWRlcnMiLCJBeGlvcyIsImRlZmF1bHQiLCJkbnMiLCJhY2Nlc3NUb2tlbiIsInNlc3Npb25JZCIsInVybFJlZ2V4IiwidGVzdFVybCIsImlzU2VydmVyIiwibWV0aG9kcyIsImNsYWltVG9rZW4iLCJzZWxmIiwiY29uc29sZSIsImxvZyIsImdldCIsImdldEFjY2Vzc1Rva2VuIiwiZmV0Y2hJbWFnZSIsInByb3h5UGFyc2VkIiwicHJvY2VzcyIsImVudiIsIkhUVFBfUFJPWFkiLCJtYXRjaCIsInJlcXVlc3REYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlc0RhdGEiLCJwcm94eSIsInByb3RvY29sIiwiaG9zdCIsInBvcnQiLCJOdW1iZXIiLCJtZXRob2QiLCJ1cmwiLCJkYXRhIiwidGhlbiIsInJlc3BvbnNlIiwiY2FwIiwiY2F0Y2giLCJlcnJvciIsImxvb2t1cCIsImVyciIsImFkZHJlc3MiLCJmYW1pbHkiLCJsZW5ndGgiLCJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0Esd0M7Ozs7Ozs7Ozs7O0FDREFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLHVCQUFaO0FBQXFDRCxNQUFNLENBQUNDLElBQVAsQ0FBWSx5QkFBWjtBQUF1Q0QsTUFBTSxDQUFDQyxJQUFQLENBQVksdUJBQVosRTs7Ozs7Ozs7Ozs7QUNBNUUsSUFBSUMsTUFBSjtBQUFXRixNQUFNLENBQUNDLElBQVAsQ0FBWSxlQUFaLEVBQTRCO0FBQUNDLFFBQU0sQ0FBQ0MsQ0FBRCxF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RCxJQUFXO0FBQ2pCMUIsV0FBTyxDQUFDQyxHQUFSLENBQVl5QixLQUFLLENBQUNNLE9BQWxCO0FBQ0EsR0FoQkQ7QUFpQkEsQzs7Ozs7Ozs7Ozs7QUM3RkRoRCxNQUFNLENBQUNDLElBQVAsQ0FBWSx5QkFBWjtBQUF1Q0QsTUFBTSxDQUFDQyxJQUFQLENBQVksdUJBQVosRSIsImZpbGUiOiIvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0IG1vZHVsZXMgdXNlZCBieSBib3RoIGNsaWVudCBhbmQgc2VydmVyIHRocm91Z2ggYSBzaW5nbGUgaW5kZXggZW50cnkgcG9pbnRcbi8vIGUuZy4gdXNlcmFjY291bnRzIGNvbmZpZ3VyYXRpb24gZmlsZS5cbiIsIi8vIEltcG9ydCBzZXJ2ZXIgc3RhcnR1cCB0aHJvdWdoIGEgc2luZ2xlIGluZGV4IGVudHJ5IHBvaW50XG5cbmltcG9ydCAnL2ltcG9ydHMvc3RhcnR1cC9ib3RoJztcbmltcG9ydCAnL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXInO1xuaW1wb3J0ICcvaW1wb3J0cy9hcGkvcG93ZXJib3gnOyIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IHsgaGVhZGVycyB9IGZyb20gJ21ldGVvci9nYWRpY29oZW46aGVhZGVycyc7XG5pbXBvcnQgQXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IGRucyBmcm9tICdkbnMnO1xuXG52YXIgYWNjZXNzVG9rZW47XG52YXIgc2Vzc2lvbklkO1xuY29uc3QgdXJsUmVnZXggPSAvKFthLXowLTldKyk6XFwvXFwvKFthLXowLTlcXC5dKyk6KFtcXGRdKykvO1xuY29uc3QgdGVzdFVybCA9ICdodHRwczovL3NvdC1pbWFnZXMuc3dlZXR2aW5lc3lzdGVtcy5jb20vcHJpbWFyaWVzL0FzcGlyaW5nWmVhbG90UHJpbWFyeS5qcGVnJztcblxuaWYgKE1ldGVvci5pc1NlcnZlcikge1xuXHRNZXRlb3IubWV0aG9kcyh7XG5cdFx0XCJzYW5kc3Rvcm0uc3VibWl0Q2xhaW1Ub2tlblwiKGNsYWltVG9rZW4pIHtcblx0XHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXHRcdFx0Y29uc29sZS5sb2coYGNsYWltVG9rZW4gPSAke2NsYWltVG9rZW59YCk7XG5cdFx0XHRzZXNzaW9uSWQgPSBoZWFkZXJzLmdldChzZWxmLCAneC1zYW5kc3Rvcm0tc2Vzc2lvbi1pZCcpO1xuXHRcdFx0Y29uc29sZS5sb2coYHNlc3Npb25JZCA9ICR7c2Vzc2lvbklkfWApO1xuXHRcdFx0aWYgKE1ldGVvci5pc1NlcnZlcikge1xuXHRcdFx0XHRnZXRBY2Nlc3NUb2tlbihjbGFpbVRva2VuKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdnZXR0aW5nIGFjY2VzcyB0b2tlbicpXG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdFwic2FuZHN0b3JtLmZldGNoSW1hZ2VcIigpIHtcblx0XHRcdGlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcblx0XHRcdFx0ZmV0Y2hJbWFnZShhY2Nlc3NUb2tlbik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnZmV0Y2hpbmcgaW1hZ2UnKTtcblx0XHRcdH1cblxuXHRcdH1cblx0fSlcbn1cblxuZnVuY3Rpb24gZ2V0QWNjZXNzVG9rZW4oY2xhaW1Ub2tlbikge1xuXHRjb25zdCBwcm94eVBhcnNlZCA9IHByb2Nlc3MuZW52LkhUVFBfUFJPWFkubWF0Y2godXJsUmVnZXgpO1xuXHRjb25zdCByZXF1ZXN0RGF0YSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcInJlcXVlc3RUb2tlblwiOiBjbGFpbVRva2VuLFxuXHRcdFwicmVxdWlyZWRQZXJtaXNzaW9uc1wiOiBbXSxcblx0fSk7XG5cdHZhciByZXNEYXRhID0gXCJcIjtcblx0QXhpb3Moe1xuICAgICAgcHJveHk6IHtcbiAgICAgICAgcHJvdG9jb2w6IHByb3h5UGFyc2VkWzFdLFxuICAgICAgICBob3N0OiBwcm94eVBhcnNlZFsyXSxcbiAgICAgICAgcG9ydDogTnVtYmVyKHByb3h5UGFyc2VkWzNdKSxcbiAgICAgIH0sXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdXJsOiBgaHR0cDovL2h0dHAtYnJpZGdlL3Nlc3Npb24vJHtzZXNzaW9uSWR9L2NsYWltYCxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgXCJyZXF1ZXN0VG9rZW5cIjogY2xhaW1Ub2tlbixcbiAgICAgICAgXCJyZXF1aXJlZFBlcm1pc3Npb25zXCI6IFtdLFxuICAgICAgfVxuICAgIH0pXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdzZXR0aW5nIGFjY2VzcyB0b2tlbicpO1xuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSk7XG4gICAgICBhY2Nlc3NUb2tlbiA9IHJlc3BvbnNlLmRhdGEuY2FwO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge2NvbnNvbGUuZXJyb3IoZXJyb3IpfSlcblxufTtcblxuZnVuY3Rpb24gZmV0Y2hJbWFnZShhY2Nlc3NUb2tlbikge1xuXHRkbnMubG9va3VwKCdzb3QtaW1hZ2VzLnN3ZWV0dmluZXN5c3RlbXMuY29tJywgZnVuY3Rpb24oZXJyLCBhZGRyZXNzLCBmYW1pbHkpIHtcblx0XHRpZiAoZXJyKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkVycm9yOiBcIiArIGVycik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnNvbGUubG9nKGFkZHJlc3MpO1xuXHRcdH1cblx0fSk7XG5cdGlmICghYWNjZXNzVG9rZW4pIHJldHVybjtcblx0Y29uc29sZS5sb2coXCJmZXRjaEltYWdlXCIpO1xuXHRjb25zb2xlLmxvZyhhY2Nlc3NUb2tlbik7XG5cdGNvbnN0IHByb3h5UGFyc2VkID0gcHJvY2Vzcy5lbnYuSFRUUF9QUk9YWS5tYXRjaCh1cmxSZWdleCk7XG5cdEF4aW9zKHtcblx0XHRwcm94eToge1xuICAgICAgICBcdHByb3RvY29sOiBwcm94eVBhcnNlZFsxXSxcbiAgICAgICAgXHRob3N0OiBwcm94eVBhcnNlZFsyXSxcbiAgICAgICAgXHRwb3J0OiBOdW1iZXIocHJveHlQYXJzZWRbM10pLFxuICAgICAgXHR9LFxuICAgICAgXHRtZXRob2Q6ICdHRVQnLFxuICAgICAgXHR1cmw6IHRlc3RVcmwsXG5cdFx0aGVhZGVyczogeydBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2FjY2Vzc1Rva2VufWB9XG5cdH0pXG5cdC50aGVuKChyZXNwb25zZSA9PiB7XG5cdFx0Y29uc29sZS5sb2coJ3N1Y2Nlc3NmdWwgcmVzcG9uc2UnKTtcblx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhLmxlbmd0aCk7XG5cdH0pKVxuXHQuY2F0Y2goKGVycm9yKSA9PiB7XG5cdFx0Y29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XG5cdH0pO1xufSIsIi8vIFNlcnZlciBlbnRyeSBwb2ludCwgaW1wb3J0cyBhbGwgc2VydmVyIGNvZGVcblxuaW1wb3J0ICcvaW1wb3J0cy9zdGFydHVwL3NlcnZlcic7XG5pbXBvcnQgJy9pbXBvcnRzL3N0YXJ0dXAvYm90aCc7XG4iXX0=
