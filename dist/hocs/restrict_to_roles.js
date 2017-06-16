'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mantraCore = require('mantra-core');

exports.default = function (rolesOnly, error) {
  return (0, _mantraCore.composeWithTracker)(function (props, onData) {
    var _props$context = props.context(),
        Meteor = _props$context.Meteor,
        Roles = _props$context.Roles;

    if (!Meteor.loggingIn()) {
      if (Roles.userIsInRole(Meteor.userId(), rolesOnly)) {
        onData(null, props);
      } else {
        onData(new Error('not allowed'));
      }
    }
  }, null, error);
};
//# sourceMappingURL=restrict_to_roles.js.map