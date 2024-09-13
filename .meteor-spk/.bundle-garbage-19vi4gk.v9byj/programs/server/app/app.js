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
var accessToken;
var sessionId;

if (Meteor.isServer) {
  Meteor.methods({
    "sandstorm.submitClaimToken"(claimToken) {
      const self = this;
      console.log("claimToken = ".concat(claimToken));
      sessionId = headers.get(self, 'x-sandstorm-session-id');
      console.log("sessionId = ".concat(sessionId));
    }

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9zdGFydHVwL2JvdGgvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXIvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL3Bvd2VyYm94LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWFpbi5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJsaW5rIiwiTWV0ZW9yIiwidiIsImhlYWRlcnMiLCJhY2Nlc3NUb2tlbiIsInNlc3Npb25JZCIsImlzU2VydmVyIiwibWV0aG9kcyIsImNsYWltVG9rZW4iLCJzZWxmIiwiY29uc29sZSIsImxvZyIsImdldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBLHdDOzs7Ozs7Ozs7OztBQ0RBQSxNQUFNLENBQUNDLElBQVAsQ0FBWSx1QkFBWjtBQUFxQ0QsTUFBTSxDQUFDQyxJQUFQLENBQVkseUJBQVo7QUFBdUNELE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLHVCQUFaLEU7Ozs7Ozs7Ozs7O0FDQTVFLElBQUlDLE1BQUo7QUFBV0YsTUFBTSxDQUFDQyxJQUFQLENBQVksZUFBWixFQUE0QjtBQUFDQyxRQUFNLENBQUNDLENBQUQsRUFBRztBQUFDRCxVQUFNLEdBQUNDLENBQVA7QUFBUzs7QUFBcEIsQ0FBNUIsRUFBa0QsQ0FBbEQ7QUFBcUQsSUFBSUMsT0FBSjtBQUFZSixNQUFNLENBQUNDLElBQVAsQ0FBWSwwQkFBWixFQUF1QztBQUFDRyxTQUFPLENBQUNELENBQUQsRUFBRztBQUFDQyxXQUFPLEdBQUNELENBQVI7QUFBVTs7QUFBdEIsQ0FBdkMsRUFBK0QsQ0FBL0Q7QUFHNUUsSUFBSUUsV0FBSjtBQUNBLElBQUlDLFNBQUo7O0FBRUEsSUFBSUosTUFBTSxDQUFDSyxRQUFYLEVBQXFCO0FBQ3BCTCxRQUFNLENBQUNNLE9BQVAsQ0FBZTtBQUNkLGlDQUE2QkMsVUFBN0IsRUFBeUM7QUFDeEMsWUFBTUMsSUFBSSxHQUFHLElBQWI7QUFDQUMsYUFBTyxDQUFDQyxHQUFSLHdCQUE0QkgsVUFBNUI7QUFDQUgsZUFBUyxHQUFHRixPQUFPLENBQUNTLEdBQVIsQ0FBWUgsSUFBWixFQUFrQix3QkFBbEIsQ0FBWjtBQUNBQyxhQUFPLENBQUNDLEdBQVIsdUJBQTJCTixTQUEzQjtBQUNBOztBQU5hLEdBQWY7QUFRQSxDOzs7Ozs7Ozs7OztBQ2ZETixNQUFNLENBQUNDLElBQVAsQ0FBWSx5QkFBWjtBQUF1Q0QsTUFBTSxDQUFDQyxJQUFQLENBQVksdUJBQVosRSIsImZpbGUiOiIvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0IG1vZHVsZXMgdXNlZCBieSBib3RoIGNsaWVudCBhbmQgc2VydmVyIHRocm91Z2ggYSBzaW5nbGUgaW5kZXggZW50cnkgcG9pbnRcbi8vIGUuZy4gdXNlcmFjY291bnRzIGNvbmZpZ3VyYXRpb24gZmlsZS5cbiIsIi8vIEltcG9ydCBzZXJ2ZXIgc3RhcnR1cCB0aHJvdWdoIGEgc2luZ2xlIGluZGV4IGVudHJ5IHBvaW50XG5cbmltcG9ydCAnL2ltcG9ydHMvc3RhcnR1cC9ib3RoJztcbmltcG9ydCAnL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXInO1xuaW1wb3J0ICcvaW1wb3J0cy9hcGkvcG93ZXJib3gnOyIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IHsgaGVhZGVycyB9IGZyb20gJ21ldGVvci9nYWRpY29oZW46aGVhZGVycyc7XG5cbnZhciBhY2Nlc3NUb2tlbjtcbnZhciBzZXNzaW9uSWQ7XG5cbmlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcblx0TWV0ZW9yLm1ldGhvZHMoe1xuXHRcdFwic2FuZHN0b3JtLnN1Ym1pdENsYWltVG9rZW5cIihjbGFpbVRva2VuKSB7XG5cdFx0XHRjb25zdCBzZWxmID0gdGhpcztcblx0XHRcdGNvbnNvbGUubG9nKGBjbGFpbVRva2VuID0gJHtjbGFpbVRva2VufWApO1xuXHRcdFx0c2Vzc2lvbklkID0gaGVhZGVycy5nZXQoc2VsZiwgJ3gtc2FuZHN0b3JtLXNlc3Npb24taWQnKTtcblx0XHRcdGNvbnNvbGUubG9nKGBzZXNzaW9uSWQgPSAke3Nlc3Npb25JZH1gKTtcblx0XHR9XG5cdH0pXG59IiwiLy8gU2VydmVyIGVudHJ5IHBvaW50LCBpbXBvcnRzIGFsbCBzZXJ2ZXIgY29kZVxuXG5pbXBvcnQgJy9pbXBvcnRzL3N0YXJ0dXAvc2VydmVyJztcbmltcG9ydCAnL2ltcG9ydHMvc3RhcnR1cC9ib3RoJztcbiJdfQ==
