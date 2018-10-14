'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = composeWithTracker;

var _reactKomposer = require('@storybook/react-komposer');

var myCompose = (0, _reactKomposer.setDefaults)({
  pure: true,
  withRef: false
});

/* global Tracker, Meteor */

function composeWithTracker(reactiveFn, options) {
  var onPropsChange = function onPropsChange(props, onData, context) {
    if (Meteor.isServer) {
      reactiveFn(props, onData, context);
      return function () {
        return null;
      };
    }
    var trackerCleanup = void 0;
    var handler = Tracker.nonreactive(function () {
      return Tracker.autorun(function () {
        trackerCleanup = reactiveFn(props, onData, context);
      });
    });

    return function () {
      if (typeof trackerCleanup === 'function') {
        trackerCleanup();
      }
      return handler.stop();
    };
  };

  return myCompose(onPropsChange, options);
}
//# sourceMappingURL=composeWithTracker.js.map