'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _not_allowed_message = require('./not_allowed_message');

var _not_allowed_message2 = _interopRequireDefault(_not_allowed_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotAllowed = function NotAllowed(_ref) {
  var MainLayout = _ref.MainLayout;
  return MainLayout ? _react2.default.createElement(MainLayout, { content: function content() {
      return _react2.default.createElement(_not_allowed_message2.default, null);
    } }) : _react2.default.createElement(_not_allowed_message2.default, null);
};

NotAllowed.propTypes = {
  MainLayout: _propTypes2.default.element
};

exports.default = NotAllowed;
//# sourceMappingURL=not_allowed.js.map