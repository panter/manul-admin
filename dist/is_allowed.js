'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _some2 = require('lodash/some');

var _some3 = _interopRequireDefault(_some2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (adminConfig) {
  var collections = adminConfig.collections,
      _adminConfig$allowRul = adminConfig.allowRules,
      globalAllowRules = _adminConfig$allowRul === undefined ? [] : _adminConfig$allowRul;

  return function (collectionName, userId) {
    var _collections$collecti = collections[collectionName].allowRules,
        allowRules = _collections$collecti === undefined ? [] : _collections$collecti;

    var rules = globalAllowRules.concat(allowRules);
    return (0, _some3.default)(rules, function (allowed) {
      return allowed(userId);
    });
  };
};
//# sourceMappingURL=is_allowed.js.map