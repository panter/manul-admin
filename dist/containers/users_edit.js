'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.depsMapper = exports.adminComposer = exports.userComposer = undefined;

var _mantraCore = require('mantra-core');

var _users_edit = require('../components/users_edit');

var _users_edit2 = _interopRequireDefault(_users_edit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userComposer = exports.userComposer = function userComposer(_ref, onData) {
  var context = _ref.context,
      doc = _ref.doc;

  onData(null, { user: doc });
};

var adminComposer = exports.adminComposer = function adminComposer(_ref2, onData) {
  var context = _ref2.context,
      user = _ref2.user;

  var _context = context(),
      Roles = _context.Roles;

  if (user) {
    var isAdmin = Roles.userIsInRole(user._id, 'admin', Roles.GLOBAL_GROUP);
    onData(null, { isAdmin: isAdmin });
    return;
  }
  onData(null, {});
};

var depsMapper = exports.depsMapper = function depsMapper(_context2, actions) {
  return {
    context: function context() {
      return _context2;
    },
    upgradeToAdmin: actions.admin.upgradeToAdmin,
    revokeAdmin: actions.admin.revokeAdmin,
    update: actions.manulAdmin.update
  };
};

exports.default = (0, _mantraCore.composeAll)((0, _mantraCore.composeWithTracker)(adminComposer), (0, _mantraCore.composeWithTracker)(userComposer), (0, _mantraCore.useDeps)(depsMapper))(_users_edit2.default);
//# sourceMappingURL=users_edit.js.map