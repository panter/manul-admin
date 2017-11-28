'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  cursor: pointer;\n  font-weight: bold;\n'], ['\n  cursor: pointer;\n  font-weight: bold;\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _TableHeadingCell = require('griddle-react/dist/module/components/TableHeadingCell');

var _TableHeadingCell2 = _interopRequireDefault(_TableHeadingCell);

var _cell = require('./cell');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseHeaderCell = (0, _cell.styleCell)(_TableHeadingCell2.default);
exports.default = (0, _styledComponents2.default)(BaseHeaderCell)(_templateObject);
//# sourceMappingURL=header_cell.js.map