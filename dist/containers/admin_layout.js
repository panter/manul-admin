'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.depsMapper = exports.mainLayoutMapper = exports.composer = undefined;

var _get2 = require('lodash/fp/get');

var _get3 = _interopRequireDefault(_get2);

var _mantraCore = require('mantra-core');

var _component_from_context_or = require('../hocs/component_from_context_or');

var _component_from_context_or2 = _interopRequireDefault(_component_from_context_or);

var _admin_layout = require('../components/admin_layout');

var _admin_layout2 = _interopRequireDefault(_admin_layout);

var _restrict_to_roles = require('../hocs/restrict_to_roles');

var _restrict_to_roles2 = _interopRequireDefault(_restrict_to_roles);

var _not_allowed = require('../components/not_allowed');

var _not_allowed2 = _interopRequireDefault(_not_allowed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composer = exports.composer = function composer(_ref, onData) {
  var context = _ref.context;

  onData(null, {});
};

/**
 * Returns the main layout defined in the admin context.
 * Returns false if not defined.
 * @param {} context
 */
var mainLayoutMapper = exports.mainLayoutMapper = function mainLayoutMapper(context) {
  return (0, _get3.default)('adminContext.components.MainLayout'.split('.'), context);
};

/**
 * NotAllowed wrapper providing a main layout reference.
 */
var NotAllowedWrapper = (0, _mantraCore.useDeps)(function (context) {
  return {
    MainLayout: mainLayoutMapper(context)
  };
})(_not_allowed2.default);

var depsMapper = exports.depsMapper = function depsMapper(_context) {
  return {
    context: function context() {
      return _context;
    },
    MainLayout: mainLayoutMapper(_context),
    adminConfig: _context.adminContext.config
  };
};

exports.default = (0, _component_from_context_or2.default)('Layout', (0, _mantraCore.composeAll)((0, _mantraCore.composeWithTracker)(composer), (0, _restrict_to_roles2.default)('admin', NotAllowedWrapper), (0, _mantraCore.useDeps)(depsMapper))(_admin_layout2.default));
//# sourceMappingURL=admin_layout.js.map