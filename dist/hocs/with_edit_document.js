'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _mantraCore = require('mantra-core');

var composer = function composer() {
  return function (_ref, onData) {
    var context = _ref.context;
    var publications = _ref.publications;
    var collection = _ref.collection;
    var collectionName = _ref.collectionName;
    var _ref$params = _ref.params;
    var params = _ref$params === undefined ? {} : _ref$params;
    var _id = _ref._id;

    var docId = _id || params._id; // for route usage

    var _context = context();

    var Meteor = _context.Meteor;

    var docLoaded = docId && Meteor.subscribe(publications.edit, docId).ready();
    var doc = docId && collection.findOne(docId);
    onData(null, { docId: docId, doc: doc, docLoaded: docLoaded });
  };
};

exports.composer = composer;

exports['default'] = function () {
  return (0, _mantraCore.composeWithTracker)(composer());
};
//# sourceMappingURL=with_edit_document.js.map