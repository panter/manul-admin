'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  margin-bottom: 20px;\n  display: flex;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  & > * {\n    /* for iphone < 6 */\n    @media (max-width: 374px) {\n      flex: 1 1 auto;\n    }\n  }\n\n'], ['\n  margin-bottom: 20px;\n  display: flex;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  & > * {\n    /* for iphone < 6 */\n    @media (max-width: 374px) {\n      flex: 1 1 auto;\n    }\n  }\n\n']);

var _manulI18n = require('@panter/manul-i18n');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ButtonGroup = _styledComponents2.default.div(_templateObject);

ButtonGroup.propTypes = {};

ButtonGroup.defaultProps = {};

ButtonGroup.displayName = 'ButtonGroup';

exports.default = ButtonGroup;
//# sourceMappingURL=button_group.js.map