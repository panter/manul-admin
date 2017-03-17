'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composer = undefined;

var _mantraCore = require('mantra-core');

var _query_utils = require('../utils/query_utils');

var _local_state_utils = require('../utils/local_state_utils');

var composer = exports.composer = function composer() {
  return function (_ref, onData) {
    var context = _ref.context,
        publications = _ref.publications,
        collection = _ref.collection,
        collectionName = _ref.collectionName;

    var _context = context(),
        _context$adminContext = _context.adminContext,
        Meteor = _context$adminContext.Meteor,
        LocalState = _context$adminContext.LocalState,
        Counts = _context$adminContext.Counts;

    var filter = LocalState.get((0, _local_state_utils.stateListFilter)(collectionName));
    var sortProperties = LocalState.get((0, _local_state_utils.stateListSort)(collectionName));
    var pageProperties = LocalState.get((0, _local_state_utils.statePageProperties)(collectionName));
    var docsLoaded = Meteor.subscribe(publications.list, filter).ready();
    var query = (0, _query_utils.filterToQuery)(filter);
    var docs = collection.find(query, (0, _query_utils.gridOptionsToQueryOptions)({ sortProperties: sortProperties, pageProperties: pageProperties })).fetch();
    var recordCount = Counts.get(publications.counts);
    onData(null, { docsLoaded: docsLoaded, docs: docs, filter: filter, sortProperties: sortProperties, pageProperties: pageProperties, recordCount: recordCount });
  };
};

exports.default = function () {
  return (0, _mantraCore.composeWithTracker)(composer());
};
//# sourceMappingURL=with_list_documents.js.map