'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = composeWithTracker;

var _reactKomposer = require('@storybook/react-komposer');

var myCompose = (0, _reactKomposer.setDefaults)({ withRef: false });

function composeWithTracker(reactiveFn, L, E, options) {
  var onPropsChange = function onPropsChange(props, onData, context) {
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

  return myCompose(onPropsChange, L, E, options);
}
//# sourceMappingURL=composeWithTracker.js.map