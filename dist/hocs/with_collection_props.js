'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _mantraCore = require('mantra-core');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var composer = function composer(type) {
  return function (_ref, onData) {
    var context = _ref.context;
    var collectionName = _ref.collectionName;

    var props = _objectWithoutProperties(_ref, ['context', 'collectionName']);

    var _context = context();

    var _context$adminContext = _context.adminContext;
    var getComponent = _context$adminContext.getComponent;
    var publicationUtils = _context$adminContext.publicationUtils;
    var config = _context$adminContext.config;
    var collections = config.collections;

    var publications = publicationUtils.getPublications(collectionName);
    var _collections$collectionName = collections[collectionName];
    var collection = _collections$collectionName.collection;
    var schema = _collections$collectionName.schema;

    var colConfig = _objectWithoutProperties(_collections$collectionName, ['collection', 'schema']);

    var Component = getComponent({ collectionName: collectionName, type: type });
    onData(null, _extends({
      Component: Component,
      collection: collection,
      schema: schema || _lodash2['default'].result(collection, 'simpleSchema'),
      publications: publications
    }, colConfig, props));
  };
};

exports.composer = composer;
// allow override

exports['default'] = function (type) {
  return (0, _mantraCore.composeWithTracker)(composer(type));
};
//# sourceMappingURL=with_collection_props.js.map