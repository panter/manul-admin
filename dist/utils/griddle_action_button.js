'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GriddleActionIconLinkButton = exports.GriddleActionButton = exports.GriddleActionLinkButton = undefined;

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  margin-right: 8px;\n'], ['\n  margin-right: 8px;\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _button = require('../components/button');

var _button2 = _interopRequireDefault(_button);

var _link_button = require('../containers/link_button');

var _link_button2 = _interopRequireDefault(_link_button);

var _iconLinkButton = require('../components/icon-link-button');

var _iconLinkButton2 = _interopRequireDefault(_iconLinkButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styleButton = function styleButton(component) {
  return (0, _styledComponents2.default)(component)(_templateObject);
};

var GriddleActionLinkButton = exports.GriddleActionLinkButton = styleButton(_link_button2.default);
var GriddleActionButton = exports.GriddleActionButton = styleButton(_button2.default);
var GriddleActionIconLinkButton = exports.GriddleActionIconLinkButton = styleButton(_iconLinkButton2.default);
//# sourceMappingURL=griddle_action_button.js.map