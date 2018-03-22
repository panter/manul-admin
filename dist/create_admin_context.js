'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _has2 = require('lodash/has');

var _has3 = _interopRequireDefault(_has2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _keys2 = require('lodash/keys');

var _keys3 = _interopRequireDefault(_keys2);

var _isNil2 = require('lodash/isNil');

var _isNil3 = _interopRequireDefault(_isNil2);

var _some2 = require('lodash/some');

var _some3 = _interopRequireDefault(_some2);

var _defaultsDeep2 = require('lodash/defaultsDeep');

var _defaultsDeep3 = _interopRequireDefault(_defaultsDeep2);

var _create_methods = require('./create_methods');

var _create_methods2 = _interopRequireDefault(_create_methods);

var _default_components = require('./default_components');

var _default_components2 = _interopRequireDefault(_default_components);

var _publication_utils = require('./utils/publication_utils');

var _publication_utils2 = _interopRequireDefault(_publication_utils);

var _route_utils = require('./utils/route_utils');

var _route_utils2 = _interopRequireDefault(_route_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var Meteor = _ref.Meteor,
      ValidatedMethod = _ref.ValidatedMethod,
      LocalState = _ref.LocalState,
      SimpleSchema = _ref.SimpleSchema,
      config = _ref.config,
      adminRoutes = _ref.adminRoutes,
      components = _ref.components,
      _ref$gotoRoute = _ref.gotoRoute,
      gotoRoute = _ref$gotoRoute === undefined ? function (routeName) {
    return window.alert('please provide a gotoRoute-function in adminContext that can jump to ' + routeName);
  } : _ref$gotoRoute;

  (0, _defaultsDeep3.default)(components, _default_components2.default);

  var neededMeteorPackages = { Meteor: Meteor, ValidatedMethod: ValidatedMethod, LocalState: LocalState };
  if ((0, _some3.default)(neededMeteorPackages, _isNil3.default)) {
    throw new Error('please provide all of the following meteor-packages: ' + (0, _keys3.default)(neededMeteorPackages).join(', '));
  }
  var methods = (0, _create_methods2.default)({ Meteor: Meteor, SimpleSchema: SimpleSchema, ValidatedMethod: ValidatedMethod }, config);
  var getComponent = function getComponent(_ref2) {
    var collectionName = _ref2.collectionName,
        type = _ref2.type;

    var Component = null;
    if ((0, _isFunction3.default)(components[type])) {
      Component = components[type];
    } else if ((0, _has3.default)(components, [type, collectionName])) {
      Component = components[type][collectionName];
    } else {
      Component = components[type].default;
    }
    Component.displayName = 'Admin_' + collectionName + '_' + type;
    return Component;
  };
  return {
    Meteor: Meteor,
    LocalState: LocalState,
    SimpleSchema: SimpleSchema,
    methods: methods,
    getComponent: getComponent,
    config: config,
    adminRoutes: adminRoutes,
    gotoRoute: gotoRoute,
    components: components,
    routeUtils: _route_utils2.default,
    publicationUtils: _publication_utils2.default
  };
};
//# sourceMappingURL=create_admin_context.js.map