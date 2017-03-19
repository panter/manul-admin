'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composer = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _result2 = require('lodash/result');

var _result3 = _interopRequireDefault(_result2);

var _mantraCore = require('mantra-core');

var _simplSchema = require('simpl-schema');

var _simplSchema2 = _interopRequireDefault(_simplSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchSchema = new _simplSchema2.default({
  searchTerm: {
    type: String,
    optional: true
  }
});
var composer = function composer(type) {
  return function (_ref, onData) {
    var context = _ref.context,
        collectionName = _ref.collectionName,
        props = (0, _objectWithoutProperties3.default)(_ref, ['context', 'collectionName']);

    var _context = context(),
        _context$adminContext = _context.adminContext,
        getComponent = _context$adminContext.getComponent,
        publicationUtils = _context$adminContext.publicationUtils,
        config = _context$adminContext.config;

    var collections = config.collections;

    var publications = publicationUtils.getPublications(collectionName);
    var _collections$collecti = collections[collectionName],
        collection = _collections$collecti.collection,
        schema = _collections$collecti.schema,
        colConfig = (0, _objectWithoutProperties3.default)(_collections$collecti, ['collection', 'schema']);

    var Component = getComponent({ collectionName: collectionName, type: type });
    onData(null, (0, _extends3.default)({
      Component: Component,
      collection: collection,
      schema: schema || (0, _result3.default)(collection, 'simpleSchema'),
      searchSchema: searchSchema,
      publications: publications
    }, colConfig, props));
  };
};

exports.composer = composer;

exports.default = function (type) {
  return (0, _mantraCore.composeWithTracker)(composer(type));
};
//# sourceMappingURL=with_collection_props.js.map