'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridOptionsToQueryOptions = exports.filterToQuery = undefined;

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _omitBy = require('lodash/fp/omitBy');

var _omitBy2 = _interopRequireDefault(_omitBy);

var _isObject = require('lodash/fp/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _mapValues = require('lodash/fp/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

var _keyBy = require('lodash/fp/keyBy');

var _keyBy2 = _interopRequireDefault(_keyBy);

var _isEmpty4 = require('lodash/fp/isEmpty');

var _isEmpty5 = _interopRequireDefault(_isEmpty4);

var _flow = require('lodash/fp/flow');

var _flow2 = _interopRequireDefault(_flow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var removeEmptyObjects = (0, _omitBy2.default)(function (o) {
  return (0, _isObject2.default)(o) && (0, _isEmpty5.default)(o);
});

/* eslint import/prefer-default-export: 0 */
var filterToQuery = exports.filterToQuery = function filterToQuery(filter) {
  // console.log('got filter', filter);
  // remove empty objects on filter

  if ((0, _isEmpty3.default)(filter)) {
    return {};
  }

  var query = removeEmptyObjects(filter);
  // console.log('query is', query);
  return query;
};

var sortPropsToMongoSort = (0, _flow2.default)((0, _keyBy2.default)('id'), (0, _mapValues2.default)(function (_ref) {
  var sortAscending = _ref.sortAscending;
  return sortAscending ? 1 : -1;
}));

var pagePropertiesToLimitAndSkip = function pagePropertiesToLimitAndSkip() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { currentPage: 1, pageSize: 10 },
      currentPage = _ref2.currentPage,
      pageSize = _ref2.pageSize;

  return {
    limit: pageSize,
    skip: (currentPage - 1) * pageSize
  };
};
var gridOptionsToQueryOptions = exports.gridOptionsToQueryOptions = function gridOptionsToQueryOptions(_ref3) {
  var sortProperties = _ref3.sortProperties,
      pageProperties = _ref3.pageProperties;

  // console.log('got sortProperties', sortProperties);
  var sort = sortPropsToMongoSort(sortProperties);
  // console.log('mongo sort', sort);
  var limitAndSkip = pagePropertiesToLimitAndSkip(pageProperties);
  return _extends({
    sort: sort
  }, limitAndSkip);
};
//# sourceMappingURL=query_utils.js.map