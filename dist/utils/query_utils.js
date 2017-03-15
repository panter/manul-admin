'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodashFpOmitBy = require('lodash/fp/omitBy');

var _lodashFpOmitBy2 = _interopRequireDefault(_lodashFpOmitBy);

var _lodashFpIsObject = require('lodash/fp/isObject');

var _lodashFpIsObject2 = _interopRequireDefault(_lodashFpIsObject);

var _lodashFpMapValues = require('lodash/fp/mapValues');

var _lodashFpMapValues2 = _interopRequireDefault(_lodashFpMapValues);

var _lodashFpKeyBy = require('lodash/fp/keyBy');

var _lodashFpKeyBy2 = _interopRequireDefault(_lodashFpKeyBy);

var _lodashFpIsEmpty = require('lodash/fp/isEmpty');

var _lodashFpIsEmpty2 = _interopRequireDefault(_lodashFpIsEmpty);

var _lodashFpFlow = require('lodash/fp/flow');

var _lodashFpFlow2 = _interopRequireDefault(_lodashFpFlow);

var removeEmptyObjects = (0, _lodashFpOmitBy2['default'])(function (o) {
  return (0, _lodashFpIsObject2['default'])(o) && (0, _lodashFpIsEmpty2['default'])(o);
});

/* eslint import/prefer-default-export: 0 */
var filterToQuery = function filterToQuery(filter) {
  console.log('got filter', filter);
  // remove empty objects on filter

  if (_lodash2['default'].isEmpty(filter)) {
    return {};
  }

  var query = removeEmptyObjects(filter);
  // console.log('query is', query);
  return query;
};

exports.filterToQuery = filterToQuery;
var sortPropsToMongoSort = (0, _lodashFpFlow2['default'])((0, _lodashFpKeyBy2['default'])('id'), (0, _lodashFpMapValues2['default'])(function (_ref) {
  var sortAscending = _ref.sortAscending;
  return sortAscending ? 1 : -1;
}));

var pagePropertiesToLimitAndSkip = function pagePropertiesToLimitAndSkip() {
  var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? { currentPage: 1, pageSize: 10 } : arguments[0];

  var currentPage = _ref2.currentPage;
  var pageSize = _ref2.pageSize;
  return {
    limit: pageSize,
    skip: (currentPage - 1) * pageSize
  };
};
var gridOptionsToQueryOptions = function gridOptionsToQueryOptions(_ref3) {
  var sortProperties = _ref3.sortProperties;
  var pageProperties = _ref3.pageProperties;

  // console.log('got sortProperties', sortProperties);
  var sort = sortPropsToMongoSort(sortProperties);
  // console.log('mongo sort', sort);
  var limitAndSkip = pagePropertiesToLimitAndSkip(pageProperties);
  return _extends({
    sort: sort
  }, limitAndSkip);
};
exports.gridOptionsToQueryOptions = gridOptionsToQueryOptions;
//# sourceMappingURL=query_utils.js.map