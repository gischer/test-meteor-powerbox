import { Meteor } from 'meteor/meteor';

import { Config } from '/imports/startup/both/config';

Meteor.startup(() => {
  // code to run on server at startup
  if (Meteor.isServer) {
    import { ensureDirectoryStructure } from '/imports/lib/ensureDirectory';

    ensureDirectoryStructure(Config.localFileRoot + '/images');
  }
});
