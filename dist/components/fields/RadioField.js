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

var Radio = function Radio(_ref) {
  var allowedValues = _ref.allowedValues,
      disabled = _ref.disabled,
      id = _ref.id,
      label = _ref.label,
      name = _ref.name,
      _onChange = _ref.onChange,
      transform = _ref.transform,
      value = _ref.value,
      props = (0, _objectWithoutProperties3.default)(_ref, ['allowedValues', 'disabled', 'id', 'label', 'name', 'onChange', 'transform', 'value']);
  return _react2.default.createElement(
    'div',
    (0, _filterDOMProps2.default)(props),
    label && _react2.default.createElement(
      'label',
      { htmlFor: props.id },
      label
    ),
    allowedValues.map(function (item) {
      return _react2.default.createElement(
        'div',
        { key: item },
        _react2.default.createElement('input', {
          checked: item === value,
          disabled: disabled,
          id: id + '-' + item,
          name: name,
          onChange: function onChange() {
            return _onChange(item);
          },
          type: 'radio'
        }),
        _react2.default.createElement(
          'label',
          { htmlFor: id + '-' + item },
          transform ? transform(item) : item
        )
      );
    })
  );
};

exports.default = (0, _connectField2.default)(Radio);
//# sourceMappingURL=RadioField.js.map