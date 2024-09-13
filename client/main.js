import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

const descriptor = "EA5QAQEAABEBF1EEAQH/x80lxnnjecgAQAMxCUIBAAH/aHR0cHM6Ly8Ec290LWltYWdlcy5zd2VldHZpbmVzeXN0ZW1zLmNvbQA=";
const rpcId = 42;


Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.buttonClicked = new ReactiveVar(false);
});

Template.hello.helpers({
  buttonClicked() {
    return Template.instance().buttonClicked.get();
  },
});

Template.hello.events({
  'click button#start-button'(event) {
    addPowerboxListener(rpcId);
    invokePowerbox(rpcId);
    Template.instance().buttonClicked.set(true);
  },

  'click button#fetch-button'(event) {
    Meteor.call("sandstorm.fetchImage");
  },
});

function addPowerboxListener(rpcId) {
  console.log('adding listener');
  console.log(rpcId);
  window.addEventListener("message", function (event) {
    console.log("listener called");
    console.log(event);
    if (event.source !== window.parent) {
    // SECURITY: ignore postMessages that didn't come from the parent frame.
      return;
    }

    var response = event.data;

    if (response.rpcId !== rpcId) {
    // Ignore RPC ID that dosen't match our request. (In real code you'd
    // probably have a table of outstanding RPCs so that you don't have to
    // register a separate handler for each one.)
      return;
    }

    if (response.error) {
    // Oops, something went wrong.
      alert(response.error);
      return;
    }

    if (response.canceled) {
    // The user closed the Powerbox without making a selection.
      return;
    }

  // We now have a claim token. We need to send this to our server
  // where we can exchange it for access to the remote API!
    doClaimToken(response.token);
  });
};

function doClaimToken(token) {
  console.log('claim token');
  console.log(token);
  Meteor.call("sandstorm.submitClaimToken", token);
};

function invokePowerbox(rpcId){
  window.parent.postMessage({
  powerboxRequest: {
    rpcId: rpcId,
    query: [
      descriptor,
    ],
    saveLabel: {defaultText: "image api for powerbox test"},
  }
}, "*");
};
