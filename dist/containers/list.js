'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mantraCore = require('mantra-core');

var _with_collection_props = require('../hocs/with_collection_props');

var _with_collection_props2 = _interopRequireDefault(_with_collection_props);

var _with_list_documents = require('../hocs/with_list_documents');

var _with_list_documents2 = _interopRequireDefault(_with_list_documents);

var _with_deps = require('../hocs/with_deps');

var _with_deps2 = _interopRequireDefault(_with_deps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = (0, _mantraCore.composeAll)((0, _with_list_documents2.default)(), (0, _with_collection_props2.default)('list'), (0, _with_deps2.default)())(function (_ref) {
  var Component = _ref.Component,
      props = _objectWithoutProperties(_ref, ['Component']);

  return _react2.default.createElement(Component, props);
});
//# sourceMappingURL=list.js.map