'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.depsMapper = undefined;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getOr2 = require('lodash/fp/getOr');

var _getOr3 = _interopRequireDefault(_getOr2);

var _mantraCore = require('mantra-core');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * helper that returns either the component from context.manulDraft
 * or one of the given default component
**/
var depsMapper = exports.depsMapper = function depsMapper(_context) {
  return {
    context: function context() {
      return _context;
    },
    components: _context.adminContext.components
  };
};

exports.default = function (componentName, DefaultComponent) {
  return (0, _mantraCore.composeAll)((0, _mantraCore.useDeps)(depsMapper))(function (_ref) {
    var components = _ref.components,
        props = (0, _objectWithoutProperties3.default)(_ref, ['components']);

    var Component = (0, _getOr3.default)(DefaultComponent, componentName, components);
    return _react2.default.createElement(Component, props);
  });
};
//# sourceMappingURL=component_from_context_or.js.map