'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composer = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _withHandlers2 = require('recompose/withHandlers');

var _withHandlers3 = _interopRequireDefault(_withHandlers2);

var _get2 = require('lodash/fp/get');

var _get3 = _interopRequireDefault(_get2);

var _reactKomposer = require('@storybook/react-komposer');

var _composeWithTracker = require('../utils/composeWithTracker');

var _composeWithTracker2 = _interopRequireDefault(_composeWithTracker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * this does a "soft" aggregation on the client
 */
var composer = function composer() {
  return function (props, onData) {
    var aggregationName = props.aggregationName,
        aggregations = props.aggregations;

    var aggregation = (0, _get3.default)(aggregationName)(aggregations);
    if (!aggregation) {
      onData(new Error('unkown aggregation:' + aggregationName));
    } else {
      var aggregate = aggregation.aggregate,
          aggregateComposer = aggregation.aggregateComposer,
          aggregationProps = (0, _objectWithoutProperties3.default)(aggregation, ['aggregate', 'aggregateComposer']);

      var allAggregationProps = (0, _extends3.default)({}, aggregationProps, {
        griddleLocal: true,
        isAggregation: true
      });
      if (aggregateComposer) {
        aggregateComposer(props, function (e, p) {
          return onData(e, (0, _extends3.default)({}, allAggregationProps, p));
        });
      } else if (aggregate) {
        var docsAggregated = aggregate(props.docs, props);
        onData(null, (0, _extends3.default)({
          docs: docsAggregated
        }, allAggregationProps));
      } else {
        onData(new Error('specify either aggregate or aggregateComposer'));
      }
    }
  };
};

exports.composer = composer;

exports.default = function (type) {
  return (0, _reactKomposer.composeAll)((0, _withHandlers3.default)({
    // overwrite
    exportCurrentSearchAsCsv: function exportCurrentSearchAsCsv(_ref) {
      var docs = _ref.docs,
          exportCsvFromLocalDocs = _ref.exportCsvFromLocalDocs;
      return function () {
        for (var _len = arguments.length, exportArgs = Array(_len), _key = 0; _key < _len; _key++) {
          exportArgs[_key] = arguments[_key];
        }

        exportCsvFromLocalDocs.apply(undefined, [docs].concat(exportArgs));
      };
    }
  }), (0, _composeWithTracker2.default)(composer(type)));
};
//# sourceMappingURL=with_aggregation.js.map