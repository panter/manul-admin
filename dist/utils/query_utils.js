'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridOptionsToQueryOptions = exports.filterToQuery = exports.createSearchQuery = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _trim2 = require('lodash/fp/trim');

var _trim3 = _interopRequireDefault(_trim2);

var _split2 = require('lodash/fp/split');

var _split3 = _interopRequireDefault(_split2);

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

var removeEmptyObjects = (0, _omitBy3.default)(function (o) {
  return (0, _isObject3.default)(o) && (0, _isEmpty3.default)(o);
});

var queryListFromRegex = function queryListFromRegex(regex) {
  return (0, _flow3.default)((0, _map3.default)(function (field) {
    return (0, _defineProperty3.default)({}, field, regex);
  }));
};
var queryForTerm = function queryForTerm(term) {
  return function (fields) {
    return {
      $or: queryListFromRegex(new RegExp(term, 'i'))(fields)
    };
  };
};
var termToTermList = (0, _flow3.default)((0, _split3.default)(' '), (0, _map3.default)(_trim3.default));
var createSearchQuery = exports.createSearchQuery = function createSearchQuery(fields, terms) {
  return {
    $and: (0, _map3.default)(function (term) {
      return queryForTerm(term)(fields);
    })(terms)
  };
};
/* eslint import/prefer-default-export: 0 */
var filterToQuery = exports.filterToQuery = function filterToQuery(filter, search) {
  var transformFilter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (f) {
    return f;
  };

  // console.log('got filter', filter);
  // console.log('got search', search);

  // remove empty objects on filter
  var query = (0, _extends3.default)({}, !(0, _isEmpty3.default)(filter) && removeEmptyObjects(transformFilter(filter)), !(0, _isEmpty3.default)(search) && !(0, _isEmpty3.default)(search.searchFields) && !(0, _isEmpty3.default)(search.searchTerm) && createSearchQuery(search.searchFields, termToTermList(search.searchTerm)));
  // console.log('query is', query);
  return query;
};

var sortPropsToMongoSort = (0, _flow3.default)((0, _keyBy3.default)('id'), (0, _mapValues3.default)(function (_ref2) {
  var sortAscending = _ref2.sortAscending;
  return sortAscending ? 1 : -1;
}));

var pagePropertiesToLimitAndSkip = function pagePropertiesToLimitAndSkip() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { currentPage: 1, pageSize: 10 },
      currentPage = _ref3.currentPage,
      pageSize = _ref3.pageSize;

  return {
    limit: pageSize,
    skip: (currentPage - 1) * pageSize
  };
};
var gridOptionsToQueryOptions = exports.gridOptionsToQueryOptions = function gridOptionsToQueryOptions(_ref4) {
  var sortProperties = _ref4.sortProperties,
      pageProperties = _ref4.pageProperties;

  // console.log('got sortProperties', sortProperties);
  var sort = sortPropsToMongoSort(sortProperties);
  // console.log('mongo sort', sort);
  var limitAndSkip = pagePropertiesToLimitAndSkip(pageProperties);
  return (0, _extends3.default)({
    sort: sort
  }, limitAndSkip);
};
//# sourceMappingURL=query_utils.js.map