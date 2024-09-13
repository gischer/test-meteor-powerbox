var require = meteorInstall({"imports":{"api":{"links":{"server":{"publications.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// imports/api/links/server/publications.js                                         //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let Links;
module.link("../links.js", {
  Links(v) {
    Links = v;
  }

}, 1);
Meteor.publish('links.all', function () {
  return Links.find();
});
//////////////////////////////////////////////////////////////////////////////////////

}},"links.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// imports/api/links/links.js                                                       //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
module.export({
  Links: () => Links
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
const Links = new Mongo.Collection('links');
//////////////////////////////////////////////////////////////////////////////////////

},"methods.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// imports/api/links/methods.js                                                     //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let check;
module.link("meteor/check", {
  check(v) {
    check = v;
  }

}, 1);
let Links;
module.link("./links.js", {
  Links(v) {
    Links = v;
  }

}, 2);
Meteor.methods({
  'links.insert'(title, url) {
    check(url, String);
    check(title, String);
    return Links.insert({
      url,
      title,
      createdAt: new Date()
    });
  }

});
//////////////////////////////////////////////////////////////////////////////////////

}}},"startup":{"both":{"index.js":function module(){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// imports/startup/both/index.js                                                    //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
// Import modules used by both client and server through a single index entry point
// e.g. useraccounts configuration file.
//////////////////////////////////////////////////////////////////////////////////////

}},"server":{"fixtures.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// imports/startup/server/fixtures.js                                               //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let Links;
module.link("../../api/links/links.js", {
  Links(v) {
    Links = v;
  }

}, 1);
Meteor.startup(() => {
  // if the Links collection is empty
  if (Links.find().count() === 0) {
    const data = [{
      title: 'Do the Tutorial',
      url: 'https://www.meteor.com/try',
      createdAt: new Date()
    }, {
      title: 'Follow the Guide',
      url: 'http://guide.meteor.com',
      createdAt: new Date()
    }, {
      title: 'Read the Docs',
      url: 'https://docs.meteor.com',
      createdAt: new Date()
    }, {
      title: 'Discussions',
      url: 'https://forums.meteor.com',
      createdAt: new Date()
    }];
    data.forEach(link => Links.insert(link));
  }
});
//////////////////////////////////////////////////////////////////////////////////////

},"index.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// imports/startup/server/index.js                                                  //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
module.link("./fixtures.js");
module.link("./register-api.js");
module.link("/imports/startup/both");
module.link("/imports/startup/server");
//////////////////////////////////////////////////////////////////////////////////////

},"register-api.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// imports/startup/server/register-api.js                                           //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
module.link("../../api/links/methods.js");
module.link("../../api/links/server/publications.js");
//////////////////////////////////////////////////////////////////////////////////////

}}}},"server":{"main.js":function module(require,exports,module){

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvbGlua3Mvc2VydmVyL3B1YmxpY2F0aW9ucy5qcyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvbGlua3MvbGlua3MuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL2xpbmtzL21ldGhvZHMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RhcnR1cC9ib3RoL2luZGV4LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL3N0YXJ0dXAvc2VydmVyL2ZpeHR1cmVzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL3N0YXJ0dXAvc2VydmVyL2luZGV4LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL3N0YXJ0dXAvc2VydmVyL3JlZ2lzdGVyLWFwaS5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL21haW4uanMiXSwibmFtZXMiOlsiTWV0ZW9yIiwibW9kdWxlIiwibGluayIsInYiLCJMaW5rcyIsInB1Ymxpc2giLCJmaW5kIiwiZXhwb3J0IiwiTW9uZ28iLCJDb2xsZWN0aW9uIiwiY2hlY2siLCJtZXRob2RzIiwidGl0bGUiLCJ1cmwiLCJTdHJpbmciLCJpbnNlcnQiLCJjcmVhdGVkQXQiLCJEYXRlIiwic3RhcnR1cCIsImNvdW50IiwiZGF0YSIsImZvckVhY2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsSUFBSUEsTUFBSjtBQUFXQyxNQUFNLENBQUNDLElBQVAsQ0FBWSxlQUFaLEVBQTRCO0FBQUNGLFFBQU0sQ0FBQ0csQ0FBRCxFQUFHO0FBQUNILFVBQU0sR0FBQ0csQ0FBUDtBQUFTOztBQUFwQixDQUE1QixFQUFrRCxDQUFsRDtBQUFxRCxJQUFJQyxLQUFKO0FBQVVILE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLGFBQVosRUFBMEI7QUFBQ0UsT0FBSyxDQUFDRCxDQUFELEVBQUc7QUFBQ0MsU0FBSyxHQUFDRCxDQUFOO0FBQVE7O0FBQWxCLENBQTFCLEVB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Q0FBYjtBQXVCQUcsUUFBSSxDQUFDQyxPQUFMLENBQWFuQixJQUFJLElBQUlFLEtBQUssQ0FBQ1csTUFBTixDQUFhYixJQUFiLENBQXJCO0FBQ0Q7QUFDRixDQTVCRCxFOzs7Ozs7Ozs7OztBQ0xBRCxNQUFNLENBQUNDLElBQVAsQ0FBWSxlQUFaO0FBQTZCRCxNQUFNLENBQUNDLElBQVAsQ0FBWSxtQkFBWjtBQUFpQ0QsTUFBTSxDQUFDQyxJQUFQLENBQVksdUJBQVo7QUFBcUNELE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLHlCQUFaLEU7Ozs7Ozs7Ozs7O0FDQW5HRCxNQUFNLENBQUNDLElBQVAsQ0FBWSw0QkFBWjtBQUEwQ0QsTUFBTSxDQUFDQyxJQUFQLENBQVksd0NBQVosRTs7Ozs7Ozs7Ozs7QUNBMUNELE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLHlCQUFaO0FBQXVDRCxNQUFNLENBQUNDLElBQVAsQ0FBWSx1QkFBWixFIiwiZmlsZSI6Ii9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBbGwgbGlua3MtcmVsYXRlZCBwdWJsaWNhdGlvbnNcblxuaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5pbXBvcnQgeyBMaW5rcyB9IGZyb20gJy4uL2xpbmtzLmpzJztcblxuTWV0ZW9yLnB1Ymxpc2goJ2xpbmtzLmFsbCcsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIExpbmtzLmZpbmQoKTtcbn0pO1xuIiwiLy8gRGVmaW5pdGlvbiBvZiB0aGUgbGlua3MgY29sbGVjdGlvblxuXG5pbXBvcnQgeyBNb25nbyB9IGZyb20gJ21ldGVvci9tb25nbyc7XG5cbmV4cG9ydCBjb25zdCBMaW5rcyA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCdsaW5rcycpO1xuIiwiLy8gTWV0aG9kcyByZWxhdGVkIHRvIGxpbmtzXG5cbmltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IHsgY2hlY2sgfSBmcm9tICdtZXRlb3IvY2hlY2snO1xuaW1wb3J0IHsgTGlua3MgfSBmcm9tICcuL2xpbmtzLmpzJztcblxuTWV0ZW9yLm1ldGhvZHMoe1xuICAnbGlua3MuaW5zZXJ0Jyh0aXRsZSwgdXJsKSB7XG4gICAgY2hlY2sodXJsLCBTdHJpbmcpO1xuICAgIGNoZWNrKHRpdGxlLCBTdHJpbmcpO1xuXG4gICAgcmV0dXJuIExpbmtzLmluc2VydCh7XG4gICAgICB1cmwsXG4gICAgICB0aXRsZSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKSxcbiAgICB9KTtcbiAgfSxcbn0pO1xuIiwiLy8gSW1wb3J0IG1vZHVsZXMgdXNlZCBieSBib3RoIGNsaWVudCBhbmQgc2VydmVyIHRocm91Z2ggYSBzaW5nbGUgaW5kZXggZW50cnkgcG9pbnRcbi8vIGUuZy4gdXNlcmFjY291bnRzIGNvbmZpZ3VyYXRpb24gZmlsZS5cbiIsIi8vIEZpbGwgdGhlIERCIHdpdGggZXhhbXBsZSBkYXRhIG9uIHN0YXJ0dXBcblxuaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5pbXBvcnQgeyBMaW5rcyB9IGZyb20gJy4uLy4uL2FwaS9saW5rcy9saW5rcy5qcyc7XG5cbk1ldGVvci5zdGFydHVwKCgpID0+IHtcbiAgLy8gaWYgdGhlIExpbmtzIGNvbGxlY3Rpb24gaXMgZW1wdHlcbiAgaWYgKExpbmtzLmZpbmQoKS5jb3VudCgpID09PSAwKSB7XG4gICAgY29uc3QgZGF0YSA9IFtcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdEbyB0aGUgVHV0b3JpYWwnLFxuICAgICAgICB1cmw6ICdodHRwczovL3d3dy5tZXRlb3IuY29tL3RyeScsXG4gICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnRm9sbG93IHRoZSBHdWlkZScsXG4gICAgICAgIHVybDogJ2h0dHA6Ly9ndWlkZS5tZXRlb3IuY29tJyxcbiAgICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdSZWFkIHRoZSBEb2NzJyxcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly9kb2NzLm1ldGVvci5jb20nLFxuICAgICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ0Rpc2N1c3Npb25zJyxcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly9mb3J1bXMubWV0ZW9yLmNvbScsXG4gICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKSxcbiAgICAgIH0sXG4gICAgXTtcblxuICAgIGRhdGEuZm9yRWFjaChsaW5rID0+IExpbmtzLmluc2VydChsaW5rKSk7XG4gIH1cbn0pO1xuIiwiLy8gSW1wb3J0IHNlcnZlciBzdGFydHVwIHRocm91Z2ggYSBzaW5nbGUgaW5kZXggZW50cnkgcG9pbnRcblxuaW1wb3J0ICcuL2ZpeHR1cmVzLmpzJztcbmltcG9ydCAnLi9yZWdpc3Rlci1hcGkuanMnO1xuaW1wb3J0ICcvaW1wb3J0cy9zdGFydHVwL2JvdGgnO1xuaW1wb3J0ICcvaW1wb3J0cy9zdGFydHVwL3NlcnZlcic7XG4iLCIvLyBSZWdpc3RlciB5b3VyIGFwaXMgaGVyZVxuXG5pbXBvcnQgJy4uLy4uL2FwaS9saW5rcy9tZXRob2RzLmpzJztcbmltcG9ydCAnLi4vLi4vYXBpL2xpbmtzL3NlcnZlci9wdWJsaWNhdGlvbnMuanMnO1xuIiwiLy8gU2VydmVyIGVudHJ5IHBvaW50LCBpbXBvcnRzIGFsbCBzZXJ2ZXIgY29kZVxuXG5pbXBvcnQgJy9pbXBvcnRzL3N0YXJ0dXAvc2VydmVyJztcbmltcG9ydCAnL2ltcG9ydHMvc3RhcnR1cC9ib3RoJztcbiJdfQ==
