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

var _AutoForm = require('uniforms-bootstrap4/AutoForm');

var _AutoForm2 = _interopRequireDefault(_AutoForm);

var _ValidatedQuickForm = require('./ValidatedQuickForm');

var _ValidatedQuickForm2 = _interopRequireDefault(_ValidatedQuickForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Auto = function Auto(parent) {
  var _class, _temp;

  return _temp = _class = function (_AutoForm$Auto) {
    (0, _inherits3.default)(_class, _AutoForm$Auto);

    function _class() {
      (0, _classCallCheck3.default)(this, _class);
      return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
    }

    (0, _createClass3.default)(_class, [{
      key: 'getChildContext',
      value: function getChildContext() {
        var uniformsContext = (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), 'getChildContext', this).call(this);
        return {
          uniforms: (0, _extends3.default)({}, uniformsContext.uniforms, {
            action: this.props.action
          })
        };
      }
    }]);
    return _class;
  }(_AutoForm2.default.Auto(parent)), _class.Auto = Auto, _temp;
};

exports.default = Auto(_ValidatedQuickForm2.default);
//# sourceMappingURL=AutoForm.js.map