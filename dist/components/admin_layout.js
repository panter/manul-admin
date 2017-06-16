'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  margin: 0 !important;\n  padding: 0 !important;\n  width: 100% !important;\n  min-height: 100%;\n  height: 100%;\n'], ['\n  margin: 0 !important;\n  padding: 0 !important;\n  width: 100% !important;\n  min-height: 100%;\n  height: 100%;\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  min-height: 100%;\n  align-items: stretch;\n'], ['\n  min-height: 100%;\n  align-items: stretch;\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  padding-right: 0 !important;\n'], ['\n  padding-right: 0 !important;\n']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['\n  padding: 15px 30px 0 15px;\n  background-color: #fff;Fexport\n'], ['\n  padding: 15px 30px 0 15px;\n  background-color: #fff;Fexport\n']);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require('reactstrap');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _navbar = require('./navbar');

var _navbar2 = _interopRequireDefault(_navbar);

var _sideNav = require('../components/side-nav');

var _sideNav2 = _interopRequireDefault(_sideNav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getNavLinks = function getNavLinks(adminConfig) {
  return (0, _keys2.default)(adminConfig.collections).map(function (collectionName) {
    return {
      routeName: 'admin.' + collectionName + '.list',
      title: adminConfig.collections[collectionName].title
    };
  });
};

var LayoutContainer = (0, _styledComponents2.default)(_reactstrap.Container)(_templateObject);
var FullHeightRow = (0, _styledComponents2.default)(_reactstrap.Row)(_templateObject2);
var NoPaddingCol = (0, _styledComponents2.default)(_reactstrap.Col)(_templateObject3);
var ContentCol = (0, _styledComponents2.default)(_reactstrap.Col)(_templateObject4);

var layoutContent = function layoutContent(adminConfig, content) {
  return function () {
    return _react2.default.createElement(
      LayoutContainer,
      null,
      _react2.default.createElement(
        _reactstrap.Row,
        null,
        _react2.default.createElement(
          _reactstrap.Col,
          null,
          _react2.default.createElement(_navbar2.default, null)
        )
      ),
      _react2.default.createElement(
        FullHeightRow,
        null,
        _react2.default.createElement(
          NoPaddingCol,
          { md: '2' },
          _react2.default.createElement(_sideNav2.default, { navItems: getNavLinks(adminConfig) })
        ),
        _react2.default.createElement(
          ContentCol,
          { md: '10' },
          content()
        )
      )
    );
  };
};

var AdminLayout = function AdminLayout(_ref) {
  var content = _ref.content,
      MainLayout = _ref.MainLayout,
      adminConfig = _ref.adminConfig;

  var adminLayout = layoutContent(adminConfig, content);
  return MainLayout ? _react2.default.createElement(MainLayout, { content: adminLayout }) : _react2.default.createElement(
    'div',
    null,
    adminLayout
  );
};

AdminLayout.propTypes = {
  MainLayout: _propTypes2.default.element
};

AdminLayout.defaultProps = {};

AdminLayout.displayName = 'AdminLayout';

exports.default = AdminLayout;
//# sourceMappingURL=admin_layout.js.map