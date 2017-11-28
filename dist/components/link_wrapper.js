'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _omit2 = require('lodash/fp/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Exposes a function taking a component and returning
 * a component wrapper omitting all non-HTML properties provided
 * by hocs/link.js
 */
var LinkWrapper = function LinkWrapper(C) {
  return function (_ref) {
    var children = _ref.children,
        props = (0, _objectWithoutProperties3.default)(_ref, ['children']);

    var filteredProps = (0, _omit3.default)(['routeName', 'go', 'context', 'active', 'childActive'], props);
    return _react2.default.createElement(
      C,
      filteredProps,
      children
    );
  };
};

LinkWrapper.displayName = 'LinkWrapper';

exports.default = LinkWrapper;
//# sourceMappingURL=link_wrapper.js.map