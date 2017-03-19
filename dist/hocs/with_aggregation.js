'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composer = undefined;

var _get2 = require('lodash/fp/get');

var _get3 = _interopRequireDefault(_get2);

var _mantraCore = require('mantra-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composer = exports.composer = function composer() {
  return function (_ref, onData) {
    var context = _ref.context,
        config = _ref.config,
        collectionName = _ref.collectionName,
        aggregationName = _ref.aggregationName,
        docs = _ref.docs,
        aggregations = _ref.aggregations;

    var aggregation = (0, _get3.default)(aggregationName)(aggregations);
    if (!aggregation) {
      onData(new Error('unkown aggregation:' + aggregationName));
    } else {
      var aggregate = aggregation.aggregate,
          _aggregation$columns = aggregation.columns,
          columns = _aggregation$columns === undefined ? [] : _aggregation$columns;

      var docsAggregated = aggregate(docs);
      onData(null, {
        docs: docsAggregated,
        columns: columns,
        isAggregation: true
      });
    }
  };
};

exports.default = function (type) {
  return (0, _mantraCore.composeWithTracker)(composer(type));
};
//# sourceMappingURL=with_aggregation.js.map