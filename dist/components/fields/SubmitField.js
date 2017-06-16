'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _BaseField = require('uniforms/BaseField');

var _BaseField2 = _interopRequireDefault(_BaseField);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _filterDOMProps = require('uniforms/filterDOMProps');

var _filterDOMProps2 = _interopRequireDefault(_filterDOMProps);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SubmitField = function SubmitField(_ref, _ref2) {
  var _ref2$uniforms = _ref2.uniforms,
      error = _ref2$uniforms.error,
      disabled = _ref2$uniforms.state.disabled;
  var inputRef = _ref.inputRef,
      children = _ref.children,
      label = _ref.label,
      props = (0, _objectWithoutProperties3.default)(_ref, ['inputRef', 'children', 'label']);
  return _react2.default.createElement(
    _button2.default,
    (0, _extends3.default)({
      disabled: !!(error || disabled),
      primary: true,
      ref: inputRef,
      type: 'submit'
    }, (0, _filterDOMProps2.default)(props)),
    children || label
  );
};

SubmitField.contextTypes = _BaseField2.default.contextTypes;

exports.default = SubmitField;
//# sourceMappingURL=SubmitField.js.map