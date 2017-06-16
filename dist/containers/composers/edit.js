'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mantraCore = require('mantra-core');

var _with_collection_props = require('../../hocs/with_collection_props');

var _with_collection_props2 = _interopRequireDefault(_with_collection_props);

var _with_edit_document = require('../../hocs/with_edit_document');

var _with_edit_document2 = _interopRequireDefault(_with_edit_document);

var _with_deps = require('../../hocs/with_deps');

var _with_deps2 = _interopRequireDefault(_with_deps);

var _edit = require('../edit');

var _edit2 = _interopRequireDefault(_edit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _mantraCore.composeAll)((0, _with_edit_document2.default)(), (0, _with_collection_props2.default)(), (0, _with_deps2.default)())(function (props) {
  return _react2.default.createElement(_edit2.default, props);
});
//# sourceMappingURL=edit.js.map