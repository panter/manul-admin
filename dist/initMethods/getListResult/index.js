'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _mapValues = require('lodash/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

var _mapKeys = require('lodash/mapKeys');

var _mapKeys2 = _interopRequireDefault(_mapKeys);

var _keyBy = require('lodash/keyBy');

var _keyBy2 = _interopRequireDefault(_keyBy);

var _findLastIndex = require('lodash/findLastIndex');

var _findLastIndex2 = _interopRequireDefault(_findLastIndex);

var _mongoAggregation = require('../../utils/mongoAggregation');

var _mongoAggregation2 = _interopRequireDefault(_mongoAggregation);

var _query_utils = require('../../utils/query_utils');

var _column_utils = require('../../utils/column_utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEBUG = true;


var logObject = function logObject(obj) {
  function replacer(key, value) {
    if (value instanceof RegExp) return '__REGEXP ' + value.toString();
    return value;
  }
  console.log((0, _stringify2.default)(obj, replacer, 2));
};

var COUNT_PRESERVING_STAGES = ['$addFields', '$project', '$lookup', '$sort'];
/**
 * intelligently add the $count stage after the last stage that influences the count
 * if no such stage is given, add only the $count stage
 * @param {Array} stages
 */
var addCount = function addCount(stages) {
  var lastCountChangingStage = (0, _findLastIndex2.default)(stages, function (stage) {
    return (0, _keys2.default)(stage).find(function (key) {
      return !COUNT_PRESERVING_STAGES.includes(key);
    });
  });
  return [].concat((0, _toConsumableArray3.default)(stages.slice(0, lastCountChangingStage + 1)), [{ $count: 'count' }]);
};

/* sort and project by array index (field.<index>.subfield) is not supported as it seems, but it works, when we remove the .<index>. */
var removeArrayIndex = function removeArrayIndex(columnId) {
  return columnId && columnId.replace(/\.[0-9]+\./, '.');
};
var cleanArrayIndexInSort = function cleanArrayIndexInSort(sort) {
  return (0, _mapKeys2.default)(sort, function (value, key) {
    return removeArrayIndex(key);
  });
};
var extractColumnsToUse = function extractColumnsToUse(columns) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ui';
  return columns.map(function (column) {
    if (typeof column === 'string') {
      return column;
    }
    if (!column.include || column.include[type]) {
      return column.id;
    }
    return null;
  }).filter(function (c) {
    return !(0, _isEmpty2.default)(c);
  }).map(removeArrayIndex);
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
    return [].concat(basePipeline, (0, _toConsumableArray3.default)(aggregationOptions && aggregationOptions.stages ? addCount(aggregationOptions.stages) : [{ $count: 'count' }]));
  }
  var sortPipeline = [].concat((0, _toConsumableArray3.default)(!(0, _isEmpty2.default)(queryOptions.sort) ? [{ $sort: cleanArrayIndexInSort(queryOptions.sort) }] : []), (0, _toConsumableArray3.default)(queryOptions.limit ? [{ $limit: queryOptions.limit + (queryOptions.skip || 0) }] : []), [{ $skip: queryOptions.skip || 0 }]);
  var filterColumnsStage = {
    $project: (0, _mapValues2.default)((0, _keyBy2.default)(extractColumnsToUse(collectionConfig.columns, listOptions.listType)), function () {
      return true;
    })
  };
  return [].concat(basePipeline, (0, _toConsumableArray3.default)(aggregationOptions && !aggregationOptions.postSort ? sortPipeline : []), (0, _toConsumableArray3.default)(aggregationOptions ? aggregationOptions.stages : []), (0, _toConsumableArray3.default)(!aggregationOptions || aggregationOptions.postSort ? sortPipeline : []), [filterColumnsStage]);
};

/* eslint import/prefer-default-export: 0 */

exports.default = function (_ref2) {
  var context = _ref2.context,
      collectionConfig = _ref2.collectionConfig,
      listOptions = _ref2.listOptions,
      _ref2$getCount = _ref2.getCount,
      getCount = _ref2$getCount === undefined ? true : _ref2$getCount,
      _ref2$getDocuments = _ref2.getDocuments,
      getDocuments = _ref2$getDocuments === undefined ? true : _ref2$getDocuments;

  if (DEBUG) console.log('listOptions', listOptions);
  if (DEBUG) console.time('docs aggregation');
  var pipeline = getPipeline({
    context: context,
    collectionConfig: collectionConfig,
    listOptions: listOptions
  });
  if (DEBUG) logObject(pipeline);

  var docs = getDocuments ? (0, _mongoAggregation2.default)(context, collectionConfig.collection, pipeline) : undefined;
  if (DEBUG) console.timeEnd('docs aggregation');
  if (DEBUG) console.log('num docs', docs && docs.length);

  if (DEBUG) console.time('countAggregation');
  var count = 0;

  if (getCount) {
    var pageProperties = listOptions.pageProperties;


    if (docs && pageProperties && docs.length < pageProperties.pageSize) {
      count = docs.length + (pageProperties.currentPage - 1) * pageProperties.pageSize;
    } else {
      var result = (0, _mongoAggregation2.default)(context, collectionConfig.collection, getPipeline({
        context: context,
        collectionConfig: collectionConfig,
        listOptions: listOptions,

        countOnly: true
      }));
      count = result[0] ? result[0].count : 0;
    }
  }

  if (DEBUG) console.timeEnd('countAggregation');
  if (DEBUG) console.log('countAggregation result: ', count);
  return {
    docs: docs && (0, _column_utils.formatDocs)(docs, collectionConfig, listOptions.listType),
    count: count
  };
};
//# sourceMappingURL=index.js.map