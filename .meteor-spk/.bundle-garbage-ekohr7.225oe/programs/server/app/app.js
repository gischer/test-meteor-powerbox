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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9zdGFydHVwL2JvdGgvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXIvZml4dHVyZXMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXIvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXIvcmVnaXN0ZXItYXBpLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWFpbi5qcyJdLCJuYW1lcyI6WyJNZXRlb3IiLCJtb2R1bGUiLCJsaW5rIiwidiIsIkxpbmtzIiwic3RhcnR1cCIsImZpbmQiLCJjb3VudCIsImRhdGEiLCJ0aXRsZSIsInVybCIsImNyZWF0ZWRBdCIsIkRhdGUiLCJmb3JFYWNoIiwiaW5zZXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0Esd0M7Ozs7Ozs7Ozs7O0FDREEsSUFBSUEsTUFBSjtBQUFXQyxNQUFNLENBQUNDLElBQVAsQ0FBWSxlQUFaLEVBQTRCO0FBQUNGLFFBQU0sQ0FBQ0csQ0FBRCxFQUFHO0FBQUNILFVBQU0sR0FBQ0csQ0FBUDtBQUFTOztBQUFwQixDQUE1QixFQUFrRCxDQUFsRDtBQUFxRCxJQUFJQyxLQUFKO0FBQVVILE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLDBCQUFaLEVBQXVDO0FBQUNFLE9BQUssQ0FBQ0QsQ0FBRCxFQUFHO0FBQUNDLFNBQUssR0FBQ0QsQ0FBTjtBQUFROztBQUFsQixDQUF2QyxFQUEyRCxDQUEzRDtBQUsxRUgsTUFBTSxDQUFDSyxPQUFQLENBQWUsTUFBTTtBQUNuQjtBQUNBLE1BQUlELEtBQUssQ0FBQ0UsSUFBTixHQUFhQyxLQUFiLE9BQXlCLENBQTdCLEVBQWdDO0FBQzlCLFVBQU1DLElBQUksR0FBRyxDQUNYO0FBQ0VDLFdBQUssRUFBRSxpQkFEVDtBQUVFQyxTQUFHLEVBQUUsNEJBRlA7QUFHRUMsZUFBUyxFQUFFLElBQUlDLElBQUo7QUFIYixLQURXLEVBTVg7QUFDRUgsV0FBSyxFQUFFLGtCQURUO0FBRUVDLFNBQUcsRUFBRSx5QkFGUDtBQUdFQyxlQUFTLEVBQUUsSUFBSUMsSUFBSjtBQUhiLEtBTlcsRUFXWDtBQUNFSCxXQUFLLEVBQUUsZUFEVDtBQUVFQyxTQUFHLEVBQUUseUJBRlA7QUFHRUMsZUFBUyxFQUFFLElBQUlDLElBQUo7QUFIYixLQVhXLEVBZ0JYO0FBQ0VILFdBQUssRUFBRSxhQURUO0FBRUVDLFNBQUcsRUFBRSwyQkFGUDtBQUdFQyxlQUFTLEVBQUUsSUFBSUMsSUFBSjtBQUhiLEtBaEJXLENBQWI7QUF1QkFKLFFBQUksQ0FBQ0ssT0FBTCxDQUFhWCxJQUFJLElBQUlFLEtBQUssQ0FBQ1UsTUFBTixDQUFhWixJQUFiLENBQXJCO0FBQ0Q7QUFDRixDQTVCRCxFOzs7Ozs7Ozs7OztBQ0xBRCxNQUFNLENBQUNDLElBQVAsQ0FBWSxlQUFaO0FBQTZCRCxNQUFNLENBQUNDLElBQVAsQ0FBWSxtQkFBWjtBQUFpQ0QsTUFBTSxDQUFDQyxJQUFQLENBQVksdUJBQVo7QUFBcUNELE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLHlCQUFaLEU7Ozs7Ozs7Ozs7O0FDQW5HRCxNQUFNLENBQUNDLElBQVAsQ0FBWSw0QkFBWjtBQUEwQ0QsTUFBTSxDQUFDQyxJQUFQLENBQVksd0NBQVosRTs7Ozs7Ozs7Ozs7QUNBMUNELE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLHlCQUFaO0FBQXVDRCxNQUFNLENBQUNDLElBQVAsQ0FBWSx1QkFBWixFIiwiZmlsZSI6Ii9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnQgbW9kdWxlcyB1c2VkIGJ5IGJvdGggY2xpZW50IGFuZCBzZXJ2ZXIgdGhyb3VnaCBhIHNpbmdsZSBpbmRleCBlbnRyeSBwb2ludFxuLy8gZS5nLiB1c2VyYWNjb3VudHMgY29uZmlndXJhdGlvbiBmaWxlLlxuIiwiLy8gRmlsbCB0aGUgREIgd2l0aCBleGFtcGxlIGRhdGEgb24gc3RhcnR1cFxuXG5pbXBvcnQgeyBNZXRlb3IgfSBmcm9tICdtZXRlb3IvbWV0ZW9yJztcbmltcG9ydCB7IExpbmtzIH0gZnJvbSAnLi4vLi4vYXBpL2xpbmtzL2xpbmtzLmpzJztcblxuTWV0ZW9yLnN0YXJ0dXAoKCkgPT4ge1xuICAvLyBpZiB0aGUgTGlua3MgY29sbGVjdGlvbiBpcyBlbXB0eVxuICBpZiAoTGlua3MuZmluZCgpLmNvdW50KCkgPT09IDApIHtcbiAgICBjb25zdCBkYXRhID0gW1xuICAgICAge1xuICAgICAgICB0aXRsZTogJ0RvIHRoZSBUdXRvcmlhbCcsXG4gICAgICAgIHVybDogJ2h0dHBzOi8vd3d3Lm1ldGVvci5jb20vdHJ5JyxcbiAgICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdGb2xsb3cgdGhlIEd1aWRlJyxcbiAgICAgICAgdXJsOiAnaHR0cDovL2d1aWRlLm1ldGVvci5jb20nLFxuICAgICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ1JlYWQgdGhlIERvY3MnLFxuICAgICAgICB1cmw6ICdodHRwczovL2RvY3MubWV0ZW9yLmNvbScsXG4gICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnRGlzY3Vzc2lvbnMnLFxuICAgICAgICB1cmw6ICdodHRwczovL2ZvcnVtcy5tZXRlb3IuY29tJyxcbiAgICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLFxuICAgICAgfSxcbiAgICBdO1xuXG4gICAgZGF0YS5mb3JFYWNoKGxpbmsgPT4gTGlua3MuaW5zZXJ0KGxpbmspKTtcbiAgfVxufSk7XG4iLCIvLyBJbXBvcnQgc2VydmVyIHN0YXJ0dXAgdGhyb3VnaCBhIHNpbmdsZSBpbmRleCBlbnRyeSBwb2ludFxuXG5pbXBvcnQgJy4vZml4dHVyZXMuanMnO1xuaW1wb3J0ICcuL3JlZ2lzdGVyLWFwaS5qcyc7XG5pbXBvcnQgJy9pbXBvcnRzL3N0YXJ0dXAvYm90aCc7XG5pbXBvcnQgJy9pbXBvcnRzL3N0YXJ0dXAvc2VydmVyJztcbiIsIi8vIFJlZ2lzdGVyIHlvdXIgYXBpcyBoZXJlXG5cbmltcG9ydCAnLi4vLi4vYXBpL2xpbmtzL21ldGhvZHMuanMnO1xuaW1wb3J0ICcuLi8uLi9hcGkvbGlua3Mvc2VydmVyL3B1YmxpY2F0aW9ucy5qcyc7XG4iLCIvLyBTZXJ2ZXIgZW50cnkgcG9pbnQsIGltcG9ydHMgYWxsIHNlcnZlciBjb2RlXG5cbmltcG9ydCAnL2ltcG9ydHMvc3RhcnR1cC9zZXJ2ZXInO1xuaW1wb3J0ICcvaW1wb3J0cy9zdGFydHVwL2JvdGgnO1xuIl19
