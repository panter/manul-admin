'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _create_methods = require('./create_methods');

var _create_methods2 = _interopRequireDefault(_create_methods);

var _utilsRoute_utils = require('./utils/route_utils');

var _utilsRoute_utils2 = _interopRequireDefault(_utilsRoute_utils);

var _utilsPublication_utils = require('./utils/publication_utils');

var _utilsPublication_utils2 = _interopRequireDefault(_utilsPublication_utils);

exports['default'] = function (_ref) {
  var
  // needed meteor dependencies
  Meteor = _ref.Meteor;
  var ValidatedMethod = _ref.ValidatedMethod;
  var Counts = _ref.Counts;
  var LocalState = _ref.LocalState;
  var config = _ref.config;
  var // admin config
  adminRoutes = _ref.adminRoutes;
  var // FlowRouter, manulRouter compatible routes
  components = _ref.components;
  var _ref$gotoRoute = _ref.gotoRoute;
  var // component definition, see readme
  /* eslint no-alert: 0*/
  gotoRoute = _ref$gotoRoute === undefined ? function (routeName) {
    return window.alert('please provide a gotoRoute-function in adminContext that can jump to ' + routeName);
  } : _ref$gotoRoute;

  var neededMeteorPackages = { Meteor: Meteor, ValidatedMethod: ValidatedMethod, Counts: Counts, LocalState: LocalState };
  if (_lodash2['default'].some(neededMeteorPackages, _lodash2['default'].isNil)) {
    throw new Error('please provide all of the following meteor-packages: ' + _lodash2['default'].keys(neededMeteorPackages).join(', '));
  }
  var methods = (0, _create_methods2['default'])({ Meteor: Meteor, ValidatedMethod: ValidatedMethod, Counts: Counts }, config);
  var getComponent = function getComponent(_ref2) {
    var collectionName = _ref2.collectionName;
    var type = _ref2.type;

    var Component = null;
    if (_lodash2['default'].isFunction(components[type])) {
      Component = components[type];
    } else if (_lodash2['default'].has(components, [type, collectionName])) {
      Component = components[type][collectionName];
    } else {
      Component = components[type]['default'];
    }
    Component.displayName = 'Admin_' + collectionName + '_' + type;
    return Component;
  };
  return {
    Meteor: Meteor,
    LocalState: LocalState,
    Counts: Counts,
    methods: methods,
    getComponent: getComponent,
    config: config,
    adminRoutes: adminRoutes,
    gotoRoute: gotoRoute,
    components: components,
    routeUtils: _utilsRoute_utils2['default'],
    publicationUtils: _utilsPublication_utils2['default']
  };
};

module.exports = exports['default'];
//# sourceMappingURL=create_admin_context.js.map