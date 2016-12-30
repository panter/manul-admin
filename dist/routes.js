'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMounter = require('react-mounter');

var _utilsRoute_utils = require('./utils/route_utils');

var _utilsRoute_utils2 = _interopRequireDefault(_utilsRoute_utils);

var _containersEdit = require('./containers/edit');

var _containersEdit2 = _interopRequireDefault(_containersEdit);

var _containersList = require('./containers/list');

var _containersList2 = _interopRequireDefault(_containersList);

var _containersCreate = require('./containers/create');

var _containersCreate2 = _interopRequireDefault(_containersCreate);

var containers = {
  edit: _containersEdit2['default'],
  create: _containersCreate2['default'],
  list: _containersList2['default']
};

/* eslint react/display-name: 0*/

exports['default'] = function (injectDeps, _ref) {
  var adminContext = _ref.adminContext;
  var adminRoutes = adminContext.adminRoutes;
  var components = adminContext.components;
  var config = adminContext.config;

  _Object$keys(config.collections).forEach(function (collectionName) {
    ['create', 'list', 'edit'].forEach(function (type) {
      var _routeUtils$getRoute = _utilsRoute_utils2['default'].getRoute(type, collectionName);

      var path = _routeUtils$getRoute.path;
      var name = _routeUtils$getRoute.name;

      var Container = containers[type];
      adminRoutes.route(path, {
        name: name,
        action: function action(params) {
          (0, _reactMounter.mount)(injectDeps(components.layout), {
            content: function content() {
              return _react2['default'].createElement(Container, {
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

module.exports = exports['default'];
//# sourceMappingURL=routes.js.map