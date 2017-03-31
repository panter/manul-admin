'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composer = undefined;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _mantraCore = require('mantra-core');

var _recompose = require('recompose');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composer = function composer() {
  return function (_ref, onData) {
    var context = _ref.context,
        collectionName = _ref.collectionName,
        props = (0, _objectWithoutProperties3.default)(_ref, ['context', 'collectionName']);

    var _context = context(),
        getComponent = _context.adminContext.getComponent;

    var LookupButton = getComponent({ collectionName: collectionName, type: 'lookupButton' });
    var Modal = getComponent({ collectionName: collectionName, type: 'modal' });

    onData(null, { LookupButton: LookupButton, Modal: Modal });
  };
};

exports.composer = composer;

exports.default = function () {
  return (0, _mantraCore.composeAll)((0, _recompose.withState)('showLookupModal', 'setShowLookupModal'), (0, _mantraCore.composeWithTracker)(composer()));
};
//# sourceMappingURL=with_lookup_button_props.js.map