'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mantraCore = require('mantra-core');

var _hocsWith_collection_props = require('../hocs/with_collection_props');

var _hocsWith_collection_props2 = _interopRequireDefault(_hocsWith_collection_props);

var _hocsWith_deps = require('../hocs/with_deps');

var _hocsWith_deps2 = _interopRequireDefault(_hocsWith_deps);

exports['default'] = (0, _mantraCore.composeAll)((0, _hocsWith_collection_props2['default'])('create'), (0, _hocsWith_deps2['default'])())(function (_ref) {
  var Component = _ref.Component;

  var props = _objectWithoutProperties(_ref, ['Component']);

  return _react2['default'].createElement(Component, props);
});
module.exports = exports['default'];
//# sourceMappingURL=create.js.map