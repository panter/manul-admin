'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require('reactstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (C) {
  return function (props) {
    var _props$xs = props.xs,
        xs = _props$xs === undefined ? 12 : _props$xs,
        sm = props.sm,
        md = props.md,
        lg = props.lg,
        cProps = (0, _objectWithoutProperties3.default)(props, ['xs', 'sm', 'md', 'lg']);

    return _react2.default.createElement(
      _reactstrap.Col,
      { xs: xs, sm: sm, md: md, lg: lg },
      _react2.default.createElement(
        C,
        cProps,
        props.children
      )
    );
  };
};
//# sourceMappingURL=fieldColumn.js.map