'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  width: 100%;\n'], ['\n  width: 100%;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TextField = require('uniforms-bootstrap4/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _connectField = require('uniforms/connectField');

var _connectField2 = _interopRequireDefault(_connectField);

var _filterDOMProps = require('uniforms/filterDOMProps');

var _filterDOMProps2 = _interopRequireDefault(_filterDOMProps);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledTextArea = _styledComponents2.default.textarea(_templateObject);

var TextArea = (0, _connectField2.default)(function (_ref) {
  var disabled = _ref.disabled,
      id = _ref.id,
      inputRef = _ref.inputRef,
      label = _ref.label,
      name = _ref.name,
      _onChange = _ref.onChange,
      placeholder = _ref.placeholder,
      value = _ref.value,
      rowCount = _ref.rowCount,
      compProps = (0, _objectWithoutProperties3.default)(_ref, ['disabled', 'id', 'inputRef', 'label', 'name', 'onChange', 'placeholder', 'value', 'rowCount']);
  return _react2.default.createElement(
    'div',
    (0, _filterDOMProps2.default)(compProps),
    label && _react2.default.createElement(
      'label',
      { htmlFor: id },
      label
    ),
    _react2.default.createElement(StyledTextArea, {
      className: 'form-control',
      disabled: disabled,
      id: id,
      name: name,
      onChange: function onChange(event) {
        return _onChange(event.target.value);
      },
      placeholder: placeholder,
      ref: inputRef,
      rows: rowCount,
      value: value
    })
  );
});

var Text = function Text(props) {
  var Component = !props.rowCount ? _TextField2.default : TextArea;

  return _react2.default.createElement(Component, props);
};

exports.default = Text;
//# sourceMappingURL=TextField.js.map