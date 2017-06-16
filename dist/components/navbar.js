'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactstrap = require('reactstrap');

var _nav_link = require('../containers/nav_link');

var _nav_link2 = _interopRequireDefault(_nav_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var NavBar = function NavBar(_ref) {
  var _ref$appTitle = _ref.appTitle,
      appTitle = _ref$appTitle === undefined ? 'Manul Admin UI' : _ref$appTitle,
      _ref$navLinks = _ref.navLinks,
      navLinks = _ref$navLinks === undefined ? [] : _ref$navLinks,
      _ref$adminRootHref = _ref.adminRootHref,
      adminRootHref = _ref$adminRootHref === undefined ? '/admin' : _ref$adminRootHref;
  return React.createElement(
    _reactstrap.Navbar,
    { color: 'faded', light: true, toggleable: true },
    React.createElement(_reactstrap.NavbarToggler, { right: true }),
    React.createElement(
      _reactstrap.NavbarBrand,
      { href: adminRootHref },
      appTitle
    ),
    React.createElement(
      _reactstrap.Collapse,
      { isOpen: true, navbar: true },
      React.createElement(
        _reactstrap.Nav,
        { className: 'ml-auto', navbar: true },
        navLinks.forEach(function (l) {
          return React.createElement(
            _reactstrap.NavItem,
            null,
            React.createElement(
              _nav_link2.default,
              { href: l.href },
              l.text
            )
          );
        })
      )
    )
  );
};

exports.default = NavBar;
//# sourceMappingURL=navbar.js.map