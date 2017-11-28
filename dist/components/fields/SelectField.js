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

var xor = function xor(item, array) {
  var index = array.indexOf(item);
  if (index === -1) {
    return array.concat([item]);
  }

  return array.slice(0, index).concat(array.slice(index + 1));
};

var renderCheckboxes = function renderCheckboxes(_ref) {
  var allowedValues = _ref.allowedValues,
      disabled = _ref.disabled,
      fieldType = _ref.fieldType,
      id = _ref.id,
      name = _ref.name,
      _onChange = _ref.onChange,
      transform = _ref.transform,
      value = _ref.value;
  return allowedValues.map(function (item) {
    return _react2.default.createElement(
      'div',
      { key: item },
      _react2.default.createElement('input', {
        checked: fieldType === Array ? value.includes(item) : value === item,
        disabled: disabled,
        id: id + '-' + item,
        name: name,
        onChange: function onChange() {
          return _onChange(fieldType === Array ? xor(item, value) : item);
        },
        type: 'checkbox'
      }),
      _react2.default.createElement(
        'label',
        { htmlFor: id + '-' + item },
        transform ? transform(item) : item
      )
    );
  });
};

var renderSelect = function renderSelect(_ref2) {
  var allowedValues = _ref2.allowedValues,
      disabled = _ref2.disabled,
      id = _ref2.id,
      inputRef = _ref2.inputRef,
      label = _ref2.label,
      name = _ref2.name,
      _onChange2 = _ref2.onChange,
      placeholder = _ref2.placeholder,
      required = _ref2.required,
      transform = _ref2.transform,
      value = _ref2.value;
  return _react2.default.createElement(
    'select',
    {
      disabled: disabled,
      id: id,
      name: name,
      onChange: function onChange(event) {
        return _onChange2(event.target.value);
      },
      ref: inputRef,
      value: value
    },
    (!!placeholder || !required) && _react2.default.createElement(
      'option',
      { value: '', disabled: required, hidden: required },
      placeholder || label
    ),
    allowedValues.map(function (allowedValue) {
      return _react2.default.createElement(
        'option',
        { key: allowedValue, value: allowedValue },
        transform ? transform(allowedValue) : allowedValue
      );
    })
  );
};

var Select = function Select(_ref3) {
  var allowedValues = _ref3.allowedValues,
      checkboxes = _ref3.checkboxes,
      disabled = _ref3.disabled,
      fieldType = _ref3.fieldType,
      id = _ref3.id,
      inputRef = _ref3.inputRef,
      label = _ref3.label,
      name = _ref3.name,
      onChange = _ref3.onChange,
      placeholder = _ref3.placeholder,
      required = _ref3.required,
      transform = _ref3.transform,
      value = _ref3.value,
      props = (0, _objectWithoutProperties3.default)(_ref3, ['allowedValues', 'checkboxes', 'disabled', 'fieldType', 'id', 'inputRef', 'label', 'name', 'onChange', 'placeholder', 'required', 'transform', 'value']);
  return _react2.default.createElement(
    'div',
    (0, _filterDOMProps2.default)(props),
    label && _react2.default.createElement(
      'label',
      { htmlFor: id },
      label
    ),
    checkboxes || fieldType === Array ? renderCheckboxes({ allowedValues: allowedValues, disabled: disabled, id: id, name: name, onChange: onChange, transform: transform, value: value, fieldType: fieldType }) : renderSelect({ allowedValues: allowedValues, disabled: disabled, id: id, name: name, onChange: onChange, transform: transform, value: value, inputRef: inputRef, label: label, placeholder: placeholder, required: required })
  );
};

exports.default = (0, _connectField2.default)(Select);
//# sourceMappingURL=SelectField.js.map