'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys2 = require('lodash/keys');

var _keys3 = _interopRequireDefault(_keys2);

var _isNil2 = require('lodash/isNil');

var _isNil3 = _interopRequireDefault(_isNil2);

var _some2 = require('lodash/some');

var _some3 = _interopRequireDefault(_some2);

var _create_methods = require('./create_methods');

var _create_methods2 = _interopRequireDefault(_create_methods);

var _publication_utils = require('./utils/publication_utils');

var _publication_utils2 = _interopRequireDefault(_publication_utils);

var _route_utils = require('./utils/route_utils');

var _route_utils2 = _interopRequireDefault(_route_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var Meteor = _ref.Meteor,
      ValidatedMethod = _ref.ValidatedMethod,
      Counts = _ref.Counts,
      LocalState = _ref.LocalState,
      SimpleSchema = _ref.SimpleSchema,
      config = _ref.config,
      adminRoutes = _ref.adminRoutes,
      components = _ref.components,
      _ref$gotoRoute = _ref.gotoRoute,
      gotoRoute = _ref$gotoRoute === undefined ? function (routeName) {
    return window.alert('please provide a gotoRoute-function in adminContext that can jump to ' + routeName);
  } : _ref$gotoRoute;

  var neededMeteorPackages = { Meteor: Meteor, ValidatedMethod: ValidatedMethod, Counts: Counts, LocalState: LocalState };
  if ((0, _some3.default)(neededMeteorPackages, _isNil3.default)) {
    throw new Error('please provide all of the following meteor-packages: ' + (0, _keys3.default)(neededMeteorPackages).join(', '));
  }
  var methods = (0, _create_methods2.default)({ Meteor: Meteor, SimpleSchema: SimpleSchema, ValidatedMethod: ValidatedMethod, Counts: Counts }, config);
  return {
    Meteor: Meteor,
    LocalState: LocalState,
    SimpleSchema: SimpleSchema,
    Counts: Counts,
    methods: methods,
    config: config,
    adminRoutes: adminRoutes,
    gotoRoute: gotoRoute,
    components: components,
    routeUtils: _route_utils2.default,
    publicationUtils: _publication_utils2.default
  };
};
//# sourceMappingURL=create_admin_context.js.map