'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var load = function load(_ref) {
  var adminContext = _ref.adminContext;

  if (!adminContext) {
    throw new Error('Please provide a adminContext-object in your mantra-context. use createAdminContext for that');
  }
};

exports['default'] = { routes: _routes2['default'], actions: _actions2['default'], load: load };
module.exports = exports['default'];
//# sourceMappingURL=admin_module.js.map