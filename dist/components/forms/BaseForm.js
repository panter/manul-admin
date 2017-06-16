'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _BaseForm2 = require('uniforms-bootstrap4/BaseForm');

var _BaseForm3 = _interopRequireDefault(_BaseForm2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require('reactstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ManulAdminBaseForm = function (_BaseForm) {
  (0, _inherits3.default)(ManulAdminBaseForm, _BaseForm);

  function ManulAdminBaseForm() {
    (0, _classCallCheck3.default)(this, ManulAdminBaseForm);
    return (0, _possibleConstructorReturn3.default)(this, (ManulAdminBaseForm.__proto__ || (0, _getPrototypeOf2.default)(ManulAdminBaseForm)).apply(this, arguments));
  }

  (0, _createClass3.default)(ManulAdminBaseForm, [{
    key: 'render',
    value: function render() {
      var _getNativeFormProps = this.getNativeFormProps(),
          props = _getNativeFormProps.props,
          children = _getNativeFormProps.children;

      return _react2.default.createElement(
        'form',
        (0, _extends3.default)({}, props, { className: 'Remo' }),
        _react2.default.createElement(
          _reactstrap.Row,
          null,
          children
        )
      );
    }
  }]);
  return ManulAdminBaseForm;
}(_BaseForm3.default);

ManulAdminBaseForm.ManulAdminBaseForm = ManulAdminBaseForm;
ManulAdminBaseForm.displayName = 'ManulAdminBaseForm' + _BaseForm3.default.displayName;
exports.default = ManulAdminBaseForm;
//# sourceMappingURL=BaseForm.js.map