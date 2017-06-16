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

var LongText = function LongText(_ref) {
  var disabled = _ref.disabled,
      id = _ref.id,
      inputRef = _ref.inputRef,
      label = _ref.label,
      name = _ref.name,
      _onChange = _ref.onChange,
      placeholder = _ref.placeholder,
      value = _ref.value,
      props = (0, _objectWithoutProperties3.default)(_ref, ['disabled', 'id', 'inputRef', 'label', 'name', 'onChange', 'placeholder', 'value']);
  return _react2.default.createElement(
    'div',
    (0, _filterDOMProps2.default)(props),
    label && _react2.default.createElement(
      'label',
      { htmlFor: props.id },
      label
    ),
    _react2.default.createElement('textarea', {
      disabled: disabled,
      id: id,
      name: name,
      onChange: function onChange(event) {
        return _onChange(event.target.value);
      },
      placeholder: placeholder,
      ref: inputRef,
      value: value
    })
  );
};

exports.default = (0, _connectField2.default)(LongText);
//# sourceMappingURL=LongTextField.js.map