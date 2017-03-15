'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _mantraCore = require('mantra-core');

var _utilsQuery_utils = require('../utils/query_utils');

var _utilsLocal_state_utils = require('../utils/local_state_utils');

var composer = function composer() {
  return function (_ref, onData) {
    var context = _ref.context;
    var publications = _ref.publications;
    var collection = _ref.collection;
    var collectionName = _ref.collectionName;

    var _context = context();

    var _context$adminContext = _context.adminContext;
    var Meteor = _context$adminContext.Meteor;
    var LocalState = _context$adminContext.LocalState;
    var Counts = _context$adminContext.Counts;

    var filter = LocalState.get((0, _utilsLocal_state_utils.stateListFilter)(collectionName));
    var sortProperties = LocalState.get((0, _utilsLocal_state_utils.stateListSort)(collectionName));
    var pageProperties = LocalState.get((0, _utilsLocal_state_utils.statePageProperties)(collectionName));
    var docsLoaded = Meteor.subscribe(publications.list, filter).ready();
    var query = (0, _utilsQuery_utils.filterToQuery)(filter);
    var docs = collection.find(query, (0, _utilsQuery_utils.gridOptionsToQueryOptions)({ sortProperties: sortProperties, pageProperties: pageProperties })).fetch();
    var recordCount = Counts.get(publications.counts);
    onData(null, { docsLoaded: docsLoaded, docs: docs, filter: filter, sortProperties: sortProperties, pageProperties: pageProperties, recordCount: recordCount });
  };
};

exports.composer = composer;

exports['default'] = function () {
  return (0, _mantraCore.composeWithTracker)(composer());
};
//# sourceMappingURL=with_list_documents.js.map