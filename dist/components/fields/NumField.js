'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _connectField = require('uniforms/connectField');

var _connectField2 = _interopRequireDefault(_connectField);

var _filterDOMProps = require('uniforms/filterDOMProps');

var _filterDOMProps2 = _interopRequireDefault(_filterDOMProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noneIfNaN = function noneIfNaN(x) {
  return isNaN(x) ? undefined : x;
};

var Num = function Num(_ref) {
  var decimal = _ref.decimal,
      disabled = _ref.disabled,
      id = _ref.id,
      inputRef = _ref.inputRef,
      label = _ref.label,
      max = _ref.max,
      min = _ref.min,
      name = _ref.name,
      _onChange = _ref.onChange,
      placeholder = _ref.placeholder,
      step = _ref.step,
      value = _ref.value,
      props = (0, _objectWithoutProperties3.default)(_ref, ['decimal', 'disabled', 'id', 'inputRef', 'label', 'max', 'min', 'name', 'onChange', 'placeholder', 'step', 'value']);
  return _react2.default.createElement(
    'div',
    (0, _filterDOMProps2.default)(props),
    label && _react2.default.createElement(
      'label',
      { htmlFor: id },
      label
    ),
    _react2.default.createElement('input', {
      disabled: disabled,
      id: id,
      max: max,
      min: min,
      name: name,
      onChange: function onChange(event) {
        return _onChange(noneIfNaN((decimal ? parseFloat : parseInt)(event.target.value)));
      },
      placeholder: placeholder,
      ref: inputRef,
      step: step || (decimal ? 0.01 : 1),
      type: 'number',
      value: value
    })
  );
};

exports.default = (0, _connectField2.default)(Num);
//# sourceMappingURL=NumField.js.map