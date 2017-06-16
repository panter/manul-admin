'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styleCell = undefined;

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n    text-align: left;\n    padding: 8px;\n  '], ['\n    text-align: left;\n    padding: 8px;\n  ']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _Cell = require('griddle-react/dist/module/components/Cell');

var _Cell2 = _interopRequireDefault(_Cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styleCell = exports.styleCell = function styleCell(CellComponent) {
  return (0, _styledComponents2.default)(CellComponent)(_templateObject);
};

exports.default = styleCell(_Cell2.default);
//# sourceMappingURL=cell.js.map