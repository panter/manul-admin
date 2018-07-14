'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composer = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _withHandlers2 = require('recompose/withHandlers');

var _withHandlers3 = _interopRequireDefault(_withHandlers2);

var _debounce2 = require('lodash/debounce');

var _debounce3 = _interopRequireDefault(_debounce2);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _reactKomposer = require('@storybook/react-komposer');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _local_state_utils = require('../utils/local_state_utils');

var _composeWithTracker = require('../utils/composeWithTracker');

var _composeWithTracker2 = _interopRequireDefault(_composeWithTracker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEBUG = false;
/* eslint react/display-name: 0*/
var withMethodCall = function withMethodCall() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (C) {
    return function (_React$Component) {
      (0, _inherits3.default)(_class2, _React$Component);

      function _class2() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, _class2);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = _class2.__proto__ || (0, _getPrototypeOf2.default)(_class2)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
          callId: undefined,
          isLoading: true,
          docs: [],
          recordCount: 0
        }, _this.loadDataDebounced = (0, _debounce3.default)(_this.loadData, 300), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
      }

      (0, _createClass3.default)(_class2, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.loadDataDebounced();
        }
      }, {
        key: 'loadData',
        value: function loadData() {
          var _this2 = this;

          var _props = this.props,
              context = _props.context,
              collectionName = _props.collectionName,
              filter = _props.filter,
              searchTerm = _props.searchTerm,
              sortProperties = _props.sortProperties,
              pageProperties = _props.pageProperties;

          var _context = context(),
              methods = _context.adminContext.methods;

          var methodArgs = {
            filter: filter,
            searchTerm: searchTerm,
            sortProperties: sortProperties,
            pageProperties: pageProperties
          };
          if (DEBUG) console.log('calling method', methodArgs);
          var callId = Math.random();
          this.setState({
            isLoading: true,
            callId: callId
          });
          methods[collectionName].list.call(methodArgs, function (error, result) {
            if (error) {
              console.error(error);
            } else {
              if (DEBUG) console.log('got result', error, result);
              if (_this2.state.callId === callId) {
                _this2.setState({
                  isLoading: false,
                  docs: result.docs,
                  recordCount: result.count
                });
              } else if (DEBUG) console.log('ignore', searchTerm, callId, _this2.state.callId);
            }
          });
        }
      }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps) {
          if (!(0, _isEqual3.default)(nextProps, this.props)) {
            this.loadDataDebounced();
          }
        }
      }, {
        key: 'render',
        value: function render() {
          var _this3 = this;

          return _react2.default.createElement(C, (0, _extends3.default)({}, this.props, this.state, {
            refresh: function refresh() {
              _this3.loadData();
            }
          }));
        }
      }]);
      return _class2;
    }(_react2.default.Component);
  };
};

var composer = exports.composer = function composer() {
  return function (_ref2, onData) {
    var context = _ref2.context,
        collectionName = _ref2.collectionName,
        filterBase = _ref2.filter;

    var _context2 = context(),
        _context2$adminContex = _context2.adminContext,
        LocalState = _context2$adminContex.LocalState,
        config = _context2$adminContex.config;

    var collectionConfig = config.collections[collectionName];

    var listFilterSchema = collectionConfig.listFilterSchema,
        defaultFilters = collectionConfig.defaultFilters;


    var filterLocalConfigured = LocalState.get((0, _local_state_utils.stateListFilter)(collectionName)) || {};

    var filterLocal = (0, _extends3.default)({}, defaultFilters, listFilterSchema ? listFilterSchema.clean(filterLocalConfigured) : filterLocalConfigured);

    var filter = (0, _extends3.default)({}, filterLocal, filterBase);
    if (DEBUG) console.log('full filter', filter);
    var sortProperties = LocalState.get((0, _local_state_utils.stateListSort)(collectionName));
    var searchTerm = LocalState.get((0, _local_state_utils.stateListSearch)(collectionName));
    var pageProperties = LocalState.get((0, _local_state_utils.statePageProperties)(collectionName));

    onData(null, {
      filter: filter,
      searchTerm: searchTerm,
      sortProperties: sortProperties,
      pageProperties: pageProperties
    });
  };
};

exports.default = function (options) {
  return (0, _reactKomposer.composeAll)((0, _withHandlers3.default)({
    exportCurrentSearchAsCsv: function exportCurrentSearchAsCsv(_ref3) {
      var exportCsv = _ref3.exportCsv,
          collectionName = _ref3.collectionName,
          filter = _ref3.filter,
          searchTerm = _ref3.searchTerm,
          sortProperties = _ref3.sortProperties;
      return function () {
        for (var _len2 = arguments.length, exportArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          exportArgs[_key2] = arguments[_key2];
        }

        exportCsv.apply(undefined, [{ collectionName: collectionName, filter: filter, searchTerm: searchTerm, sortProperties: sortProperties }].concat(exportArgs));
      };
    }
  }), withMethodCall(options), (0, _composeWithTracker2.default)(composer(options)));
};
//# sourceMappingURL=with_list_documents.js.map