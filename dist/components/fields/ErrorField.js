'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _connectField = require('uniforms/connectField');

var _connectField2 = _interopRequireDefault(_connectField);

var _filterDOMProps = require('uniforms/filterDOMProps');

var _filterDOMProps2 = _interopRequireDefault(_filterDOMProps);

var _nothing = require('uniforms/nothing');

var _nothing2 = _interopRequireDefault(_nothing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Error = function Error(_ref) {
    var children = _ref.children,
        errorMessage = _ref.errorMessage,
        props = (0, _objectWithoutProperties3.default)(_ref, ['children', 'errorMessage']);
    return !errorMessage ? _nothing2.default : _react2.default.createElement(
        'div',
        (0, _filterDOMProps2.default)(props),
        children || errorMessage
    );
};

exports.default = (0, _connectField2.default)(Error, { initialValue: false });
//# sourceMappingURL=ErrorField.js.map