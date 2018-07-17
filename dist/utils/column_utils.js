'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDocs = exports.getColumnTitleI18nKey = exports.filterColumns = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _mapValues = require('lodash/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint import/prefer-default-export: 0*/
var filterColumns = exports.filterColumns = function filterColumns(columns, type) {
  return columns.filter(function (column) {
    return typeof column === 'string' || !column.include || column.include[type];
  });
};
var getColumnTitleI18nKey = exports.getColumnTitleI18nKey = function getColumnTitleI18nKey(_ref) {
  var collectionName = _ref.collectionName,
      collectionConfig = _ref.collectionConfig,
      column = _ref.column;
  return typeof column !== 'string' && column.title ? column.title : (collectionConfig.columnsI18n || collectionName) + '.' + (typeof column === 'string' ? column : column.id);
};

var formatDocs = exports.formatDocs = function formatDocs(docs, config, listType) {
  var formats = config.columns.reduce(function (acc, column) {
    if (typeof column !== 'string' && column.format) {
      if ((0, _isFunction2.default)(column.format)) {
        return (0, _extends5.default)({}, acc, (0, _defineProperty3.default)({}, column.id, column.format));
      } else if (column.format[listType]) {
        return (0, _extends5.default)({}, acc, (0, _defineProperty3.default)({}, column.id, column.format[listType]));
      }
    }
    return acc;
  }, {});
  var formatObj = function formatObj(obj) {
    var parentKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return (0, _mapValues2.default)(obj, function (value, key) {
      var fullKey = parentKey ? parentKey + '.' + key : key;
      if (formats[fullKey]) {
        return formats[fullKey]({ value: value, key: fullKey });
      } else if ((0, _isObject2.default)(value)) {
        return formatObj(value, fullKey);
      }
      return value;
    });
  };

  return docs.map(function (doc) {
    return formatObj(doc);
  });
};
//# sourceMappingURL=column_utils.js.map