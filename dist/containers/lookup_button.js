'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _mantraCore = require('mantra-core');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _with_deps = require('../hocs/with_deps');

var _with_deps2 = _interopRequireDefault(_with_deps);

var _with_lookup_button_props = require('../hocs/with_lookup_button_props');

var _with_lookup_button_props2 = _interopRequireDefault(_with_lookup_button_props);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _mantraCore.composeAll)((0, _with_lookup_button_props2.default)(), (0, _with_deps2.default)())(function (_ref) {
  var LookupButton = _ref.LookupButton,
      Modal = _ref.Modal,
      showLookupModal = _ref.showLookupModal,
      setShowLookupModal = _ref.setShowLookupModal,
      onChange = _ref.onChange,
      value = _ref.value,
      className = _ref.className,
      style = _ref.style,
      props = (0, _objectWithoutProperties3.default)(_ref, ['LookupButton', 'Modal', 'showLookupModal', 'setShowLookupModal', 'onChange', 'value', 'className', 'style']);
  return _react2.default.createElement(
    'span',
    { className: className, style: style },
    _react2.default.createElement(
      Modal,
      { show: showLookupModal, onHide: function onHide() {
          return setShowLookupModal(false);
        } },
      _react2.default.createElement(_list2.default, (0, _extends3.default)({}, props, { isLookup: true, onSelect: function onSelect() {
          onChange.apply(undefined, arguments);
          setShowLookupModal(false);
        }, selected: value
      }))
    ),
    _react2.default.createElement(LookupButton, (0, _extends3.default)({
      onClick: function onClick() {
        return setShowLookupModal(true);
      } }, props))
  );
});
//# sourceMappingURL=lookup_button.js.map