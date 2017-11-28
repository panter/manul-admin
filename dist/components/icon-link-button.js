'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  line-height: 1;\n  padding: 5px;\n'], ['\n  line-height: 1;\n  padding: 5px;\n']);

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _link_button = require('../containers/link_button');

var _link_button2 = _interopRequireDefault(_link_button);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledButton = (0, _styledComponents2.default)(_link_button2.default)(_templateObject);

var IconLinkButton = function IconLinkButton(_ref) {
  var iconPath = _ref.iconPath,
      icon = _ref.icon,
      props = (0, _objectWithoutProperties3.default)(_ref, ['iconPath', 'icon']);

  if (!iconPath && !icon) throw new Error('iconPath or Icon prop is required.');
  var IconComp = icon || require('react-icons/lib/' + iconPath);

  return React.createElement(
    StyledButton,
    props,
    React.createElement(IconComp, null)
  );
};

exports.default = IconLinkButton;
//# sourceMappingURL=icon-link-button.js.map