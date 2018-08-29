'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var DEBUG = false;


var DEFAULT_AGGREGATE_OPTIONS = {
  cursor: {}, // return a cursor.
  readPreference: 'secondaryPreferred' // read from secondary in a replica set
};
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
    return [].concat(basePipeline, (0, _toConsumableArray3.default)(aggregationOptions && aggregationOptions.stages ? addCount([].concat((0, _toConsumableArray3.default)(aggregationOptions.stagesPreSort || []), (0, _toConsumableArray3.default)(aggregationOptions.stages))) : [{ $count: 'count' }]));
  }
  var sortPipeline = [].concat((0, _toConsumableArray3.default)(!(0, _isEmpty2.default)(queryOptions.sort) ? [{ $sort: cleanArrayIndexInSort(queryOptions.sort) }] : []), (0, _toConsumableArray3.default)(queryOptions.limit ? [{ $limit: queryOptions.limit + (queryOptions.skip || 0) }] : []), [{ $skip: queryOptions.skip || 0 }]);
  var filterColumnsStage = {
    $project: (0, _mapValues2.default)((0, _keyBy2.default)(extractColumnsToUse(collectionConfig.columns, listOptions.listType)), function () {
      return true;
    })
  };
  return [].concat(basePipeline, (0, _toConsumableArray3.default)(aggregationOptions && aggregationOptions.stagesPreSort ? aggregationOptions.stagesPreSort : []), (0, _toConsumableArray3.default)(aggregationOptions && !aggregationOptions.postSort ? sortPipeline : []), (0, _toConsumableArray3.default)(aggregationOptions ? aggregationOptions.stages : []), (0, _toConsumableArray3.default)(!aggregationOptions || aggregationOptions.postSort ? sortPipeline : []), [filterColumnsStage]);
};

var getDocumentsAsArray = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(context, collectionConfig, listOptions) {
    var pipeline, docsCursor, docsFormatted;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pipeline = getPipeline({
              context: context,
              collectionConfig: collectionConfig,
              listOptions: listOptions
            });

            if (DEBUG) logObject(pipeline);
            _context.next = 4;
            return (0, _mongoAggregation2.default)(collectionConfig.collection, pipeline, DEFAULT_AGGREGATE_OPTIONS);

          case 4:
            docsCursor = _context.sent;

            if (!DEBUG) {
              _context.next = 14;
              break;
            }

            console.log('EXPLAIN:');
            _context.t0 = logObject;
            _context.next = 10;
            return (0, _mongoAggregation2.default)(collectionConfig.collection, pipeline, (0, _extends3.default)({}, DEFAULT_AGGREGATE_OPTIONS, {
              explain: true
            }));

          case 10:
            _context.next = 12;
            return _context.sent.toArray();

          case 12:
            _context.t1 = _context.sent;
            (0, _context.t0)(_context.t1);

          case 14:
            docsFormatted = (0, _column_utils.formatDocs)(docsCursor, collectionConfig, listOptions.listType);
            _context.next = 17;
            return docsFormatted.toArray();

          case 17:
            return _context.abrupt('return', _context.sent);

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getDocumentsAsArray(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getTheCount = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(context, collectionConfig, listOptions) {
    var countCursor, result;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _mongoAggregation2.default)(collectionConfig.collection, getPipeline({
              context: context,
              collectionConfig: collectionConfig,
              listOptions: listOptions,

              countOnly: true
            }), DEFAULT_AGGREGATE_OPTIONS);

          case 2:
            countCursor = _context2.sent;
            _context2.next = 5;
            return countCursor.toArray();

          case 5:
            result = _context2.sent;
            return _context2.abrupt('return', result[0] ? result[0].count : 0);

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getTheCount(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

/* eslint import/prefer-default-export: 0 */

exports.default = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref5) {
    var context = _ref5.context,
        collectionConfig = _ref5.collectionConfig,
        listOptions = _ref5.listOptions,
        _ref5$getCount = _ref5.getCount,
        getCount = _ref5$getCount === undefined ? true : _ref5$getCount,
        _ref5$getDocuments = _ref5.getDocuments,
        getDocuments = _ref5$getDocuments === undefined ? true : _ref5$getDocuments;
    var docs, count, pageProperties;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (DEBUG) console.log('listOptions', listOptions);
            if (DEBUG) console.time('docs aggregation');

            if (!getDocuments) {
              _context3.next = 8;
              break;
            }

            _context3.next = 5;
            return getDocumentsAsArray(context, collectionConfig, listOptions);

          case 5:
            _context3.t0 = _context3.sent;
            _context3.next = 9;
            break;

          case 8:
            _context3.t0 = [];

          case 9:
            docs = _context3.t0;


            if (DEBUG) console.timeEnd('docs aggregation');
            if (DEBUG) console.log('num docs', docs && docs.length);

            if (DEBUG) console.time('countAggregation');
            count = 0;

            if (!getCount) {
              _context3.next = 23;
              break;
            }

            pageProperties = listOptions.pageProperties;

            if (!(docs && pageProperties && docs.length < pageProperties.pageSize)) {
              _context3.next = 20;
              break;
            }

            count = docs.length + (pageProperties.currentPage - 1) * pageProperties.pageSize;
            _context3.next = 23;
            break;

          case 20:
            _context3.next = 22;
            return getTheCount(context, collectionConfig, listOptions);

          case 22:
            count = _context3.sent;

          case 23:

            if (DEBUG) console.timeEnd('countAggregation');
            if (DEBUG) console.log('countAggregation result: ', count);

            return _context3.abrupt('return', {
              docs: docs,
              count: count
            });

          case 26:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x8) {
    return _ref4.apply(this, arguments);
  };
}();
//# sourceMappingURL=index.js.map