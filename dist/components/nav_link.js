'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  border-left: 3px solid transparent;\n  color: ', ';\n  background-color: ', ';\n  border-left-color: ', ';\n  &:hover {\n    background-color: #1e282c;\n    color: #fff;\n    border-left-color: #3c8dbc;\n  }\n'], ['\n  border-left: 3px solid transparent;\n  color: ', ';\n  background-color: ', ';\n  border-left-color: ', ';\n  &:hover {\n    background-color: #1e282c;\n    color: #fff;\n    border-left-color: #3c8dbc;\n  }\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require('reactstrap');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavLinkComp = function NavLinkComp(_ref) {
  var href = _ref.href,
      children = _ref.children,
      className = _ref.className,
      onClick = _ref.onClick;
  return _react2.default.createElement(
    _reactstrap.NavLink,
    {
      href: href,
      className: className,
      onClick: onClick
    },
    children
  );
};

var NavLink = (0, _styledComponents2.default)(NavLinkComp)(_templateObject, function (props) {
  return props.active ? '#fff' : '#b8c7ce';
}, function (props) {
  return props.active ? '#1e282c' : 'none';
}, function (props) {
  return props.active ? '#3c8dbc' : 'none';
});

exports.default = NavLink;
//# sourceMappingURL=nav_link.js.map