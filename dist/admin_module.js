'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var _local_state_utils = require('./utils/local_state_utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var load = function load(_ref) {
  var LocalState = _ref.LocalState,
      adminContext = _ref.adminContext;

  if (!adminContext) {
    throw new Error('Please provide a adminContext-object in your mantra-context. use createAdminContext for that');
  }
  // set initial values
  Object.keys(adminContext.config.collections).forEach(function (collectionName) {
    LocalState.set((0, _local_state_utils.stateListSort)(collectionName), []);
    LocalState.set((0, _local_state_utils.statePageProperties)(collectionName), {
      currentPage: 1,
      pageSize: 100
    });
  });
};

exports.default = { routes: _routes2.default, actions: _actions2.default, load: load };
//# sourceMappingURL=admin_module.js.map