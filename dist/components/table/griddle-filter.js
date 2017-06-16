'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GriddleFilter = function (_React$Component) {
  (0, _inherits3.default)(GriddleFilter, _React$Component);

  function GriddleFilter() {
    (0, _classCallCheck3.default)(this, GriddleFilter);
    return (0, _possibleConstructorReturn3.default)(this, (GriddleFilter.__proto__ || (0, _getPrototypeOf2.default)(GriddleFilter)).apply(this, arguments));
  }

  (0, _createClass3.default)(GriddleFilter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateFilter(this.props.filterValue);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      console.log('hallllooooooo');
      console.log(nextProps.filterValue);
      if (this.props.filterValue !== nextProps.filterValue) {
        this.updateFilter(nextProps.filterValue);
      }
    }
  }, {
    key: 'updateFilter',
    value: function updateFilter(value) {
      this.props.setFilter(value);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('span', null);
    }
  }]);
  return GriddleFilter;
}(_react2.default.Component);

exports.default = GriddleFilter;
//# sourceMappingURL=griddle-filter.js.map