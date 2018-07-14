'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createQueryOptions = exports.sortPropsToMongoSort = exports.createQuery = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _isUndefined2 = require('lodash/fp/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _isFunction2 = require('lodash/fp/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _trim2 = require('lodash/fp/trim');

var _trim3 = _interopRequireDefault(_trim2);

var _flow2 = require('lodash/fp/flow');

var _flow3 = _interopRequireDefault(_flow2);

var _isEmpty2 = require('lodash/fp/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _keyBy2 = require('lodash/fp/keyBy');

var _keyBy3 = _interopRequireDefault(_keyBy2);

var _mapValues2 = require('lodash/fp/mapValues');

var _mapValues3 = _interopRequireDefault(_mapValues2);

var _isObject2 = require('lodash/fp/isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _map2 = require('lodash/fp/map');

var _map3 = _interopRequireDefault(_map2);

var _omitBy2 = require('lodash/fp/omitBy');

var _omitBy3 = _interopRequireDefault(_omitBy2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var removeEmptyObjects = function removeEmptyObjects(selector) {
  var cleaned = (0, _omitBy3.default)(function (o) {
    return (0, _isUndefined3.default)(o) || (0, _isObject3.default)(o) && (0, _isEmpty3.default)(o);
  })(selector);
  console.log('!!!!!!!!!');
  console.log('uncleaned', selector);
  console.log('cleaned', cleaned);

  return cleaned;
};

var queryListFromTerm = function queryListFromTerm(term) {
  return (0, _flow3.default)((0, _map3.default)(function (field) {
    return (0, _defineProperty3.default)({}, field, {
      $regex: term,
      $options: 'i'
    });
  }));
};
// using case-insensitive regex makes it slow, so we do a little hack
var queryForTerm = function queryForTerm(term) {
  return function (searchFields) {
    return {
      $or: queryListFromTerm(term)((0, _isFunction3.default)(searchFields) ? searchFields(term) : searchFields)
    };
  };
};
var termToTermList = function termToTermList(term) {
  return term ? term.split(' ').map(_trim3.default) : [];
};

var createFieldSearchQuery = function createFieldSearchQuery(searchFields, terms, useTextIndex) {
  return (
    /*
    two strategies: text search (if availble) or regex search
    - in text search, if multiple terms are separated with space, every one should occure
    */
    {
      $or: [].concat((0, _toConsumableArray3.default)(useTextIndex ? [{
        $text: {
          // quote terms, so that its an AND search
          // see https://stackoverflow.com/a/16906099/1463534
          $search: terms.map(function (t) {
            return '"' + t + '"';
          }).join(' ')
        }
      }] : []), (0, _toConsumableArray3.default)(searchFields ? [{
        $and: (0, _map3.default)(function (term) {
          return queryForTerm(term)(searchFields);
        })(terms)
      }] : []))
    }
  );
};
/* eslint import/prefer-default-export: 0 */
var createQuery = exports.createQuery = function createQuery(_ref2) {
  var filter = _ref2.filter,
      searchTerm = _ref2.searchTerm,
      searchFields = _ref2.searchFields,
      _ref2$filterToBaseQue = _ref2.filterToBaseQuery,
      filterToBaseQuery = _ref2$filterToBaseQue === undefined ? function (f) {
    return f;
  } : _ref2$filterToBaseQue,
      useTextIndex = _ref2.useTextIndex;
  return (0, _extends3.default)({}, !(0, _isEmpty3.default)(filter) ? removeEmptyObjects(filterToBaseQuery(filter)) : {}, !(0, _isEmpty3.default)(searchTerm) && ((0, _isFunction3.default)(searchFields) || !(0, _isEmpty3.default)(searchFields)) ? createFieldSearchQuery(searchFields, termToTermList(searchTerm), useTextIndex) : {});
};

var sortPropsToMongoSort = exports.sortPropsToMongoSort = (0, _flow3.default)((0, _keyBy3.default)('id'), (0, _mapValues3.default)(function (_ref3) {
  var sortAscending = _ref3.sortAscending;
  return sortAscending ? 1 : -1;
}));

var pagePropertiesToLimitAndSkip = function pagePropertiesToLimitAndSkip() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { currentPage: 1, pageSize: 50 },
      currentPage = _ref4.currentPage,
      pageSize = _ref4.pageSize;

  return {
    limit: pageSize,
    skip: (currentPage - 1) * pageSize
  };
};

var createQueryOptions = exports.createQueryOptions = function createQueryOptions(_ref5) {
  var sortProperties = _ref5.sortProperties,
      _ref5$pageProperties = _ref5.pageProperties,
      pageProperties = _ref5$pageProperties === undefined ? null : _ref5$pageProperties;

  var sort = sortPropsToMongoSort(sortProperties);

  var limitAndSkip = pageProperties ? pagePropertiesToLimitAndSkip(pageProperties) : null;
  return (0, _extends3.default)({
    sort: sort
  }, limitAndSkip);
};
//# sourceMappingURL=query_utils.js.map