'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _upperFirst2 = require('lodash/fp/upperFirst');

var _upperFirst3 = _interopRequireDefault(_upperFirst2);

var _isEmpty2 = require('lodash/fp/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMounter = require('react-mounter');

var _route_utils = require('./utils/route_utils');

var _route_utils2 = _interopRequireDefault(_route_utils);

var _layout = require('./containers/layout');

var _layout2 = _interopRequireDefault(_layout);

var _admin_home = require('./containers/admin_home');

var _admin_home2 = _interopRequireDefault(_admin_home);

var _composers = require('./containers/composers');

var composers = _interopRequireWildcard(_composers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint react/display-name: 0*/
exports.default = function (injectDeps, _ref) {
  var adminContext = _ref.adminContext;
  var adminRoutes = adminContext.adminRoutes,
      config = adminContext.config;


  adminRoutes.route('/', {
    name: 'admin.index',
    action: function action() {
      (0, _reactMounter.mount)(injectDeps(_layout2.default), {
        content: function content() {
          return _react2.default.createElement(_admin_home2.default, null);
        }
      });
    }
  });

  var createRoute = function createRoute(type, collectionName) {
    var aggregationName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var Container = composers[(0, _upperFirst3.default)(type)];

    var _routeUtils$getRoute = _route_utils2.default.getRoute(type, collectionName, aggregationName),
        path = _routeUtils$getRoute.path,
        name = _routeUtils$getRoute.name;

    adminRoutes.route(path, {
      name: name,
      action: function action(params) {
        (0, _reactMounter.mount)(injectDeps(_layout2.default), {
          content: function content() {
            return _react2.default.createElement(Container, {
              collectionName: collectionName,
              aggregationName: aggregationName,
              type: type,
              params: params
            });
          }
        });
      }
    });
  };
  (0, _keys2.default)(config.collections).forEach(function (collectionName) {
    ['create', 'list', 'edit'].forEach(function (type) {
      createRoute(type, collectionName);
    });
    var aggregations = config.collections[collectionName].aggregations;

    if (!(0, _isEmpty3.default)(aggregations)) {
      (0, _keys2.default)(aggregations).forEach(function (aggregationName) {
        createRoute('listAggregation', collectionName, aggregationName);
      });
    }
  });
};
//# sourceMappingURL=routes.js.map