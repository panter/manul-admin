'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var _utilsLocal_state_utils = require('./utils/local_state_utils');

var load = function load(_ref) {
  var LocalState = _ref.LocalState;
  var adminContext = _ref.adminContext;

  if (!adminContext) {
    throw new Error('Please provide a adminContext-object in your mantra-context. use createAdminContext for that');
  }
  // set initial values
  _Object$keys(adminContext.config.collections).forEach(function (collectionName) {
    LocalState.set((0, _utilsLocal_state_utils.stateListSort)(collectionName), []);
    LocalState.set((0, _utilsLocal_state_utils.statePageProperties)(collectionName), {
      currentPage: 1,
      pageSize: 100
    });
  });
};

exports['default'] = { routes: _routes2['default'], actions: _actions2['default'], load: load };
module.exports = exports['default'];
//# sourceMappingURL=admin_module.js.map