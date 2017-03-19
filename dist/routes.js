'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMounter = require('react-mounter');

var _route_utils = require('./utils/route_utils');

var _route_utils2 = _interopRequireDefault(_route_utils);

var _edit = require('./containers/edit');

var _edit2 = _interopRequireDefault(_edit);

var _list = require('./containers/list');

var _list2 = _interopRequireDefault(_list);

var _create = require('./containers/create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var containers = {
  edit: _edit2.default,
  create: _create2.default,
  list: _list2.default
};

/* eslint react/display-name: 0*/

exports.default = function (injectDeps, _ref) {
  var adminContext = _ref.adminContext;
  var adminRoutes = adminContext.adminRoutes,
      components = adminContext.components,
      config = adminContext.config;

  (0, _keys2.default)(config.collections).forEach(function (collectionName) {
    ['create', 'list', 'edit'].forEach(function (type) {
      var _routeUtils$getRoute = _route_utils2.default.getRoute(type, collectionName),
          path = _routeUtils$getRoute.path,
          name = _routeUtils$getRoute.name;

      var Container = containers[type];
      adminRoutes.route(path, {
        name: name,
        action: function action(params) {
          (0, _reactMounter.mount)(injectDeps(components.layout), {
            content: function content() {
              return _react2.default.createElement(Container, {
                collectionName: collectionName,
                type: type,
                params: params
              });
            }
          });
        }
      });
    });
  });
};
//# sourceMappingURL=routes.js.map