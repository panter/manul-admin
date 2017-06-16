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

var Bool = function Bool(_ref) {
  var disabled = _ref.disabled,
      id = _ref.id,
      inputRef = _ref.inputRef,
      label = _ref.label,
      name = _ref.name,
      _onChange = _ref.onChange,
      value = _ref.value,
      props = (0, _objectWithoutProperties3.default)(_ref, ['disabled', 'id', 'inputRef', 'label', 'name', 'onChange', 'value']);
  return _react2.default.createElement(
    'div',
    (0, _filterDOMProps2.default)(props),
    _react2.default.createElement('input', {
      checked: value,
      disabled: disabled,
      id: id,
      name: name,
      onChange: function onChange() {
        return disabled || _onChange(!value);
      },
      ref: inputRef,
      type: 'checkbox'
    }),
    label && _react2.default.createElement(
      'label',
      { htmlFor: id },
      label
    )
  );
};

exports.default = (0, _connectField2.default)(Bool);
//# sourceMappingURL=BoolField.js.map