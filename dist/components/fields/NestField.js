'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  border: 1px solid #eee;\n  padding: 10px;\n  margin-top: 10px;\n  border-radius: 4px;\n'], ['\n  border: 1px solid #eee;\n  padding: 10px;\n  margin-top: 10px;\n  border-radius: 4px;\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  position: relative;\n  top: -25px;\n  background: #fff;\n  padding: 0 5px;\n'], ['\n  position: relative;\n  top: -25px;\n  background: #fff;\n  padding: 0 5px;\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  margin-top: -20px;\n'], ['\n  margin-top: -20px;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _connectField = require('uniforms/connectField');

var _connectField2 = _interopRequireDefault(_connectField);

var _filterDOMProps = require('uniforms/filterDOMProps');

var _filterDOMProps2 = _interopRequireDefault(_filterDOMProps);

var _injectName = require('uniforms/injectName');

var _injectName2 = _interopRequireDefault(_injectName);

var _joinName = require('uniforms/joinName');

var _joinName2 = _interopRequireDefault(_joinName);

var _reactstrap = require('reactstrap');

var _AutoField = require('./AutoField');

var _AutoField2 = _interopRequireDefault(_AutoField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NestContainer = _styledComponents2.default.div(_templateObject);

var FloatingLabel = _styledComponents2.default.label(_templateObject2);

var MarginRow = (0, _styledComponents2.default)(_reactstrap.Row)(_templateObject3);

var Nest = function Nest(_ref) {
  var children = _ref.children,
      fields = _ref.fields,
      label = _ref.label,
      name = _ref.name,
      props = (0, _objectWithoutProperties3.default)(_ref, ['children', 'fields', 'label', 'name']);
  return _react2.default.createElement(
    NestContainer,
    (0, _filterDOMProps2.default)(props),
    label && _react2.default.createElement(
      FloatingLabel,
      { htmlFor: props.id },
      label
    ),
    _react2.default.createElement(
      MarginRow,
      null,
      children ? (0, _injectName2.default)(name, children) : fields.map(function (key) {
        return _react2.default.createElement(_AutoField2.default, { key: key, name: (0, _joinName2.default)(name, key) });
      })
    )
  );
};

exports.default = (0, _connectField2.default)(Nest, { includeInChain: false });
//# sourceMappingURL=NestField.js.map