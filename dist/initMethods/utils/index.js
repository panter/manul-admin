'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getListQueryAndOptions = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _query_utils = require('../../utils/query_utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEBUG = true;

var logObject = function logObject(obj) {
  function replacer(key, value) {
    if (value instanceof RegExp) return '__REGEXP ' + value.toString();
    return value;
  }
  console.log((0, _stringify2.default)(obj, replacer, 2));
};

/* eslint import/prefer-default-export: 0*/
var getListQueryAndOptions = exports.getListQueryAndOptions = function getListQueryAndOptions(context, collectionName, collectionConfig, listArguments) {
  var Meteor = context.Meteor;
  var filter = listArguments.filter,
      searchTerm = listArguments.searchTerm,
      sortProperties = listArguments.sortProperties,
      pageProperties = listArguments.pageProperties;
  var searchFields = collectionConfig.searchFields,
      transformFilter = collectionConfig.transformFilter,
      textIndex = collectionConfig.textIndex;

  var hasTextIndex = Meteor.isServer && Boolean(textIndex);
  var query = (0, _query_utils.filterToQuery)(filter, searchTerm && { searchFields: searchFields, searchTerm: searchTerm }, transformFilter, hasTextIndex);

  var queryOptions = (0, _query_utils.gridOptionsToQueryOptions)({
    sortProperties: sortProperties,
    pageProperties: pageProperties
  });
  if (DEBUG) logObject({ searchTerm: searchTerm, query: query, queryOptions: queryOptions });

  return {
    query: query,
    queryOptions: queryOptions
  };
};
//# sourceMappingURL=index.js.map