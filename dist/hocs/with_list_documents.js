'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composer = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _mantraCore = require('mantra-core');

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
        filterProps = _ref.filter,
        transformFilter = _ref.transformFilter,
        sortPropertiesProps = _ref.sortProperties,
        searchTermProps = _ref.searchTerm,
        pagePropertiesProps = _ref.pageProperties;

    var _context = context(),
        _context$adminContext = _context.adminContext,
        Meteor = _context$adminContext.Meteor,
        LocalState = _context$adminContext.LocalState,
        Counts = _context$adminContext.Counts;

    var filter = filterProps || LocalState.get((0, _local_state_utils.stateListFilter)(collectionName));
    var sortProperties = sortPropertiesProps || LocalState.get((0, _local_state_utils.stateListSort)(collectionName));
    var searchTerm = searchTermProps || LocalState.get((0, _local_state_utils.stateListSearch)(collectionName));
    var pageProperties = pagePropertiesProps || LocalState.get((0, _local_state_utils.statePageProperties)(collectionName));
    var docsLoaded = Meteor.subscribe(publications.list, filter).ready();
    var query = (0, _query_utils.filterToQuery)(filter, { searchTerm: searchTerm, searchFields: searchFields }, transformFilter);
    var docs = collection.find(query, (0, _extends3.default)({}, sortCursor && (0, _query_utils.gridOptionsToQueryOptions)({ sortProperties: sortProperties, pageProperties: pageProperties }))).fetch();
    var recordCount = Counts.get(publications.counts);
    onData(null, { docsLoaded: docsLoaded, docs: docs, filter: filter, searchTerm: searchTerm, sortProperties: sortProperties, pageProperties: pageProperties, recordCount: recordCount });
  };
};

exports.default = function () {
  return (0, _mantraCore.composeWithTracker)(composer());
};
//# sourceMappingURL=with_list_documents.js.map