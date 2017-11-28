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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _QuickForm = require('uniforms-bootstrap4/QuickForm');

var _QuickForm2 = _interopRequireDefault(_QuickForm);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _manulI18n = require('@panter/manul-i18n');

var _reactstrap = require('reactstrap');

var _BaseForm = require('./BaseForm');

var _BaseForm2 = _interopRequireDefault(_BaseForm);

var _AutoField = require('../fields/AutoField');

var _AutoField2 = _interopRequireDefault(_AutoField);

var _FormActions = require('../fields/FormActions');

var _FormActions2 = _interopRequireDefault(_FormActions);

var _fieldColumn = require('../fields/fieldColumn');

var _fieldColumn2 = _interopRequireDefault(_fieldColumn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Quick = function Quick(parent) {
  var _class, _temp;

  return _temp = _class = function (_QuickForm$Quick) {
    (0, _inherits3.default)(_class, _QuickForm$Quick);

    function _class() {
      (0, _classCallCheck3.default)(this, _class);
      return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
    }

    (0, _createClass3.default)(_class, [{
      key: 'getAutoField',

      /* eslint class-methods-use-this: 0*/
      value: function getAutoField() {
        return _AutoField2.default;
      }
    }, {
      key: 'getErrorsField',
      value: function getErrorsField() {
        return function () {
          return null;
        };
      }
    }, {
      key: 'getSubmitField',
      value: function getSubmitField() {
        var _this2 = this;

        if (this.props.hideSubmitButton || this.props.hideSubmitField) {
          return function () {
            return null;
          };
        }
        return (0, _fieldColumn2.default)(function (props) {
          return _react2.default.createElement(
            _FormActions2.default,
            (0, _extends3.default)({}, props, { submitLabel: _this2.props.submitLabel }),
            _this2.props.additionalActions
          );
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var nativeFormProps = this.getNativeFormProps();
        if (nativeFormProps.children) {
          return _react2.default.createElement(
            _reactstrap.Row,
            null,
            (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), 'render', this).call(this)
          );
        }

        var AutoFields = this.props.autoField || this.getAutoField();
        var ErrorsField = this.props.errorsField || this.getErrorsField();
        var SubmitField = this.props.submitField || this.getSubmitField();

        return _react2.default.createElement(
          'form',
          nativeFormProps,
          _react2.default.createElement(
            _reactstrap.Row,
            null,
            this.getChildContextSchema().getSubfields().map(function (key) {
              return _react2.default.createElement(AutoFields, { key: key, name: key });
            }),
            _react2.default.createElement(ErrorsField, null),
            _react2.default.createElement(SubmitField, null)
          )
        );
      }
    }]);
    return _class;
  }(_QuickForm2.default.Quick(parent)), _class.Quick = Quick, _temp;
};

exports.default = Quick(_BaseForm2.default);
//# sourceMappingURL=QuickForm.js.map