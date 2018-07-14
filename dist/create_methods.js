'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _initMethods = require('./initMethods');

var _initMethods2 = _interopRequireDefault(_initMethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (context, config) {
  var methods = {};
  (0, _keys2.default)(config.collections).forEach(function (collectionName) {
    methods[collectionName] = (0, _initMethods2.default)(collectionName);
  });
  return methods;
};
//# sourceMappingURL=create_methods.js.map