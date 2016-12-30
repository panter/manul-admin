'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _mantraCore = require('mantra-core');

var _utilsPublication_utils = require('../utils/publication_utils');

var _utilsPublication_utils2 = _interopRequireDefault(_utilsPublication_utils);

var composer = function composer() {
  return function (_ref, onData) {
    var context = _ref.context;
    var publications = _ref.publications;
    var collection = _ref.collection;
    var collectionName = _ref.collectionName;

    // currently not implemented, use MeteorGriddle
    onData(null, {});
  };
};

exports.composer = composer;

exports['default'] = function () {
  return (0, _mantraCore.composeWithTracker)(composer());
};
//# sourceMappingURL=with_list_documents.js.map