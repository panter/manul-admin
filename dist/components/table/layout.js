'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  background-color: #fff;\n'], ['\n  background-color: #fff;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Layout = function Layout(_ref) {
  var Table = _ref.Table,
      Pagination = _ref.Pagination,
      Filter = _ref.Filter,
      className = _ref.className;
  return _react2.default.createElement(
    'div',
    { className: className },
    _react2.default.createElement(Table, null),
    _react2.default.createElement(Pagination, null),
    _react2.default.createElement(Filter, null)
  );
};

exports.default = (0, _styledComponents2.default)(Layout)(_templateObject);
//# sourceMappingURL=layout.js.map