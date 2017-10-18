'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composer = undefined;

var _manulMantraCore = require('manul-mantra-core');

var composer = exports.composer = function composer() {
  return function (_ref, onData) {
    var context = _ref.context,
        publications = _ref.publications,
        collection = _ref.collection,
        collectionName = _ref.collectionName,
        _ref$params = _ref.params,
        params = _ref$params === undefined ? {} : _ref$params,
        _id = _ref._id;

    var docId = _id || params._id; // for route usage

    var _context = context(),
        Meteor = _context.Meteor;

    var docLoaded = docId && Meteor.subscribe(publications.edit, docId).ready();
    var doc = docId && collection.findOne(docId);
    onData(null, { docId: docId, doc: doc, docLoaded: docLoaded });
  };
};

exports.default = function () {
  return (0, _manulMantraCore.composeWithTracker)(composer());
};
//# sourceMappingURL=with_edit_document.js.map