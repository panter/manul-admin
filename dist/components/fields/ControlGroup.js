'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  justify-content: space-between;\n'], ['\n  display: flex;\n  justify-content: space-between;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Group = _styledComponents2.default.div(_templateObject);

var ControlGroup = function ControlGroup(_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    Group,
    null,
    children
  );
};

ControlGroup.displayName = 'ControlGroup';

exports.default = ControlGroup;
//# sourceMappingURL=ControlGroup.js.map