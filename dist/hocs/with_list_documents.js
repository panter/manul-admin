'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composer = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _manulMantraCore = require('manul-mantra-core');

var _query_utils = require('../utils/query_utils');

var _local_state_utils = require('../utils/local_state_utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composer = exports.composer = function composer() {
  return function (_ref, onData) {
    var context = _ref.context,
        publications = _ref.publications,
        collection = _ref.collection,
        collectionName = _ref.collectionName,
        searchFields = _ref.searchFields,
        _ref$sortCursor = _ref.sortCursor,
        sortCursor = _ref$sortCursor === undefined ? false : _ref$sortCursor,
        filterBase = _ref.filter,
        transformFilter = _ref.transformFilter;

    var _context = context(),
        _context$adminContext = _context.adminContext,
        Meteor = _context$adminContext.Meteor,
        LocalState = _context$adminContext.LocalState,
        Counts = _context$adminContext.Counts;

    var filterLocal = LocalState.get((0, _local_state_utils.stateListFilter)(collectionName));
    var filter = (0, _extends3.default)({}, filterLocal, filterBase);
    var sortProperties = LocalState.get((0, _local_state_utils.stateListSort)(collectionName));
    var searchTerm = LocalState.get((0, _local_state_utils.stateListSearch)(collectionName));
    var pageProperties = LocalState.get((0, _local_state_utils.statePageProperties)(collectionName));
    var docsLoaded = Meteor.subscribe(publications.list, filter, searchTerm, sortProperties).ready();
    var query = (0, _query_utils.filterToQuery)(filter, { searchTerm: searchTerm, searchFields: searchFields }, transformFilter);
    var docs = collection.find(query, {
      sort: (0, _query_utils.sortPropsToMongoSort)(sortProperties)
    }).fetch();
    var recordCount = Counts.get(publications.counts);
    onData(null, { docsLoaded: docsLoaded, docs: docs, filter: filter, searchTerm: searchTerm, sortProperties: sortProperties, pageProperties: pageProperties, recordCount: recordCount });
  };
};

exports.default = function () {
  return (0, _manulMantraCore.composeWithTracker)(composer());
};
//# sourceMappingURL=with_list_documents.js.map