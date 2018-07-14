'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getListResult = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _mongoAggregation = require('../../utils/mongoAggregation');

var _mongoAggregation2 = _interopRequireDefault(_mongoAggregation);

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

var getPipeline = function getPipeline(_ref) {
  var context = _ref.context,
      collectionConfig = _ref.collectionConfig,
      listOptions = _ref.listOptions,
      _ref$countOnly = _ref.countOnly,
      countOnly = _ref$countOnly === undefined ? false : _ref$countOnly;
  var Meteor = context.Meteor;
  var filter = listOptions.filter,
      searchTerm = listOptions.searchTerm,
      sortProperties = listOptions.sortProperties,
      pageProperties = listOptions.pageProperties;
  var searchFields = collectionConfig.searchFields,
      filterToBaseQuery = collectionConfig.filterToBaseQuery,
      textIndex = collectionConfig.textIndex,
      aggregation = collectionConfig.aggregation;

  var useTextIndex = Meteor.isServer && Boolean(textIndex);
  var baseQuery = (0, _query_utils.createQuery)({
    filter: filter,
    searchFields: searchFields,
    searchTerm: searchTerm,
    filterToBaseQuery: filterToBaseQuery,
    useTextIndex: useTextIndex
  });

  var queryOptions = (0, _query_utils.createQueryOptions)({
    sortProperties: sortProperties,
    pageProperties: pageProperties
  });
  if (DEBUG) logObject({ searchTerm: searchTerm, baseQuery: baseQuery, queryOptions: queryOptions });
  /* eslint no-nested-ternary: 0*/

  var aggregationOptions = aggregation && (0, _isFunction2.default)(aggregation) ? aggregation({
    searchTerm: searchTerm,
    filter: filter,
    collectionConfig: collectionConfig,
    listOptions: listOptions,
    countOnly: countOnly
  }) : aggregation;

  var basePipeline = [{ $match: baseQuery }];

  if (countOnly) {
    return [].concat(basePipeline, [{ $count: 'count' }]);
  }
  var sortPipeline = [].concat((0, _toConsumableArray3.default)(!(0, _isEmpty2.default)(queryOptions.sort) ? [{ $sort: queryOptions.sort }] : []), (0, _toConsumableArray3.default)(queryOptions.limit ? [{ $limit: queryOptions.limit + (queryOptions.skip || 0) }] : []), [{ $skip: queryOptions.skip || 0 }]);

  return [].concat(basePipeline, (0, _toConsumableArray3.default)(aggregationOptions && !aggregationOptions.postSort ? sortPipeline : []), (0, _toConsumableArray3.default)(aggregationOptions ? aggregationOptions.stages : []), (0, _toConsumableArray3.default)(!aggregationOptions || aggregationOptions.postSort ? sortPipeline : []));
};

/* eslint import/prefer-default-export: 0 */
var getListResult = exports.getListResult = function getListResult(_ref2) {
  var context = _ref2.context,
      collectionConfig = _ref2.collectionConfig,
      listOptions = _ref2.listOptions,
      _ref2$getCount = _ref2.getCount,
      getCount = _ref2$getCount === undefined ? true : _ref2$getCount,
      _ref2$getDocuments = _ref2.getDocuments,
      getDocuments = _ref2$getDocuments === undefined ? true : _ref2$getDocuments;

  if (DEBUG) console.time('docs aggregation');
  var pipeline = getPipeline({
    context: context,
    collectionConfig: collectionConfig,
    listOptions: listOptions
  });
  if (DEBUG) logObject(pipeline);

  var docsAggregation = getDocuments ? (0, _mongoAggregation2.default)(context, collectionConfig.collection, pipeline) : undefined;
  if (DEBUG) console.timeEnd('docs aggregation');
  /*
  if (DEBUG) console.time('docs');
  const docs = getDocuments
    ? collectionConfig.collection.find(query, queryOptions).fetch()
    : undefined;
  if (DEBUG) console.timeEnd('docs');
  
   if (DEBUG) console.time('count');
  const count = getCount
    ? collectionConfig.collection.find(query).count()
    : undefined;
  if (DEBUG) console.timeEnd('count');
     */
  if (DEBUG) console.time('countAggregation');

  var _ref3 = getCount ? (0, _mongoAggregation2.default)(context, collectionConfig.collection, getPipeline({
    context: context,
    collectionConfig: collectionConfig,
    listOptions: listOptions,
    countOnly: true
  })) : [{ count: 0 }],
      _ref4 = (0, _slicedToArray3.default)(_ref3, 1),
      _ref4$ = _ref4[0];

  _ref4$ = _ref4$ === undefined ? {} : _ref4$;
  var count = _ref4$.count;

  if (DEBUG) console.timeEnd('countAggregation');
  console.log('countAggregation', count);
  return { docs: docsAggregation, count: count };
};
//# sourceMappingURL=index.js.map