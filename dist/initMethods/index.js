'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _update = require('./update');

var _update2 = _interopRequireDefault(_update);

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

var _destroy = require('./destroy');

var _destroy2 = _interopRequireDefault(_destroy);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _listCount = require('./listCount');

var _listCount2 = _interopRequireDefault(_listCount);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initMethodsForCollection = function initMethodsForCollection(context, collectionName, collectionConfig) {
  return {
    update: (0, _update2.default)(context, collectionName, collectionConfig),
    create: (0, _create2.default)(context, collectionName, collectionConfig),
    destroy: (0, _destroy2.default)(context, collectionName, collectionConfig),
    list: (0, _list2.default)(context, collectionName, collectionConfig),
    listCount: (0, _listCount2.default)(context, collectionName, collectionConfig)
  };
};

exports.default = function (context) {
  var methods = {};
  (0, _keys2.default)(context.config.collections).forEach(function (collectionName) {
    var collectionConfig = context.config.collections[collectionName];

    methods[collectionName] = initMethodsForCollection(context, collectionName, collectionConfig);
  });
  return methods;
};
//# sourceMappingURL=index.js.map