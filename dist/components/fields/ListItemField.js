'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _connectField = require('uniforms/connectField');

var _connectField2 = _interopRequireDefault(_connectField);

var _joinName = require('uniforms/joinName');

var _joinName2 = _interopRequireDefault(_joinName);

var _AutoField = require('./AutoField');

var _AutoField2 = _interopRequireDefault(_AutoField);

var _ListDelField = require('./ListDelField');

var _ListDelField2 = _interopRequireDefault(_ListDelField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListItem = function ListItem(props) {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_ListDelField2.default, { name: props.name }),
    props.children ? _react.Children.map(props.children, function (child) {
      return _react2.default.cloneElement(child, {
        name: (0, _joinName2.default)(props.name, child.props.name),
        label: null
      });
    }) : _react2.default.createElement(_AutoField2.default, props)
  );
};

exports.default = (0, _connectField2.default)(ListItem, { includeInChain: false });
//# sourceMappingURL=ListItemField.js.map