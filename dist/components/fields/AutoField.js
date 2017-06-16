'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.componentOverwrites = undefined;

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

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _react = require('react');

var _AutoField = require('uniforms-bootstrap4/AutoField');

var _AutoField2 = _interopRequireDefault(_AutoField);

var _fieldColumn = require('./fieldColumn');

var _fieldColumn2 = _interopRequireDefault(_fieldColumn);

var _NestField = require('./NestField');

var _NestField2 = _interopRequireDefault(_NestField);

var _ListField = require('./ListField');

var _ListField2 = _interopRequireDefault(_ListField);

var _TextField = require('./TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Component overwrites
var componentOverwrites = exports.componentOverwrites = new _map2.default([[Object, (0, _fieldColumn2.default)(_NestField2.default)], [Array, (0, _fieldColumn2.default)(_ListField2.default)], [String, (0, _fieldColumn2.default)(_TextField2.default)]]);

var ColumnedBaseAutoField = (0, _fieldColumn2.default)(_AutoField2.default);

var AutoField = function (_BaseAutoField) {
  (0, _inherits3.default)(AutoField, _BaseAutoField);

  function AutoField() {
    (0, _classCallCheck3.default)(this, AutoField);
    return (0, _possibleConstructorReturn3.default)(this, (AutoField.__proto__ || (0, _getPrototypeOf2.default)(AutoField)).apply(this, arguments));
  }

  (0, _createClass3.default)(AutoField, [{
    key: 'render',
    value: function render() {
      // this.getFieldProps also returns props from context, such as uniforms props:
      var props = this.getFieldProps(undefined, { ensureValue: false });
      var component = props.component || componentOverwrites.get(props.fieldType) || ColumnedBaseAutoField;
      return (0, _react.createElement)(component, (0, _extends3.default)({}, props));
    }
  }]);
  return AutoField;
}(_AutoField2.default);

AutoField.displayName = 'AutoField';
exports.default = AutoField;
//# sourceMappingURL=AutoField.js.map