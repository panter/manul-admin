'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _griddleReact = require('griddle-react');

var _griddleReact2 = _interopRequireDefault(_griddleReact);

var _table = require('./table');

var tableComponents = _interopRequireWildcard(_table);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Griddle = function Griddle(_ref) {
  var style = _ref.style,
      docsLoaded = _ref.docsLoaded,
      className = _ref.className,
      components = _ref.components,
      children = _ref.children,
      props = (0, _objectWithoutProperties3.default)(_ref, ['style', 'docsLoaded', 'className', 'components', 'children']);
  return _react2.default.createElement(
    'div',
    {
      style: (0, _extends3.default)({
        overflow: 'auto',
        width: '100%'
      }, style), className: className
    },
    _react2.default.createElement(
      _griddleReact2.default,
      (0, _extends3.default)({
        components: (0, _extends3.default)({}, tableComponents, components)
      }, props, {
        plugins: [_griddleReact.plugins.LocalPlugin]
      }),
      children
    )
  );
};

exports.default = Griddle;
//# sourceMappingURL=griddle.js.map