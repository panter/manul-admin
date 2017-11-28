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

var dateFormat = function dateFormat(value) {
  return value && value.toISOString().slice(0, -8);
};
var dateParse = function dateParse(timestamp, onChange) {
  var date = new Date(timestamp);
  if (date.getFullYear() < 10000) {
    onChange(date);
  }
};

var Date_ = function Date_(_ref) {
  var disabled = _ref.disabled,
      id = _ref.id,
      inputRef = _ref.inputRef,
      label = _ref.label,
      max = _ref.max,
      min = _ref.min,
      name = _ref.name,
      _onChange = _ref.onChange,
      placeholder = _ref.placeholder,
      value = _ref.value,
      props = (0, _objectWithoutProperties3.default)(_ref, ['disabled', 'id', 'inputRef', 'label', 'max', 'min', 'name', 'onChange', 'placeholder', 'value']);
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
      max: dateFormat(max),
      min: dateFormat(min),
      name: name,
      onChange: function onChange(event) {
        return dateParse(event.target.valueAsNumber, _onChange);
      },
      placeholder: placeholder,
      ref: inputRef,
      type: 'datetime-local',
      value: dateFormat(value)
    })
  );
};

Date_.displayName = 'Date';

exports.default = (0, _connectField2.default)(Date_);
//# sourceMappingURL=DateField.js.map