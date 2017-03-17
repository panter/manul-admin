'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mantraCore = require('mantra-core');

var _with_collection_props = require('../hocs/with_collection_props');

var _with_collection_props2 = _interopRequireDefault(_with_collection_props);

var _with_edit_document = require('../hocs/with_edit_document');

var _with_edit_document2 = _interopRequireDefault(_with_edit_document);

var _with_deps = require('../hocs/with_deps');

var _with_deps2 = _interopRequireDefault(_with_deps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = (0, _mantraCore.composeAll)((0, _with_edit_document2.default)(), (0, _with_collection_props2.default)('preview'), (0, _with_deps2.default)())(function (_ref) {
  var Component = _ref.Component,
      props = _objectWithoutProperties(_ref, ['Component']);

  return _react2.default.createElement(Component, props);
});
//# sourceMappingURL=preview.js.map