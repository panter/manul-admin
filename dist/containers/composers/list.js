'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mantraCore = require('mantra-core');

var _with_collection_props = require('../../hocs/with_collection_props');

var _with_collection_props2 = _interopRequireDefault(_with_collection_props);

var _with_list_documents = require('../../hocs/with_list_documents');

var _with_list_documents2 = _interopRequireDefault(_with_list_documents);

var _with_deps = require('../../hocs/with_deps');

var _with_deps2 = _interopRequireDefault(_with_deps);

var _list = require('../list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _mantraCore.composeAll)((0, _with_list_documents2.default)(), (0, _with_collection_props2.default)(), (0, _with_deps2.default)())(function (props) {
  return _react2.default.createElement(_list2.default, props);
});
//# sourceMappingURL=list.js.map