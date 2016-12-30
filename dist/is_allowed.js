'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

exports['default'] = function (adminConfig) {
  var collections = adminConfig.collections;
  var _adminConfig$allowRules = adminConfig.allowRules;
  var globalAllowRules = _adminConfig$allowRules === undefined ? [] : _adminConfig$allowRules;

  return function (collectionName, userId) {
    var _collections$collectionName$allowRules = collections[collectionName].allowRules;
    var allowRules = _collections$collectionName$allowRules === undefined ? [] : _collections$collectionName$allowRules;

    var rules = globalAllowRules.concat(allowRules);
    return _lodash2['default'].some(rules, function (allowed) {
      return allowed(userId);
    });
  };
};

module.exports = exports['default'];
//# sourceMappingURL=is_allowed.js.map