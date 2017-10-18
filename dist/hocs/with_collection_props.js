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

var _manulMantraCore = require('manul-mantra-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composer = function composer(type) {
  return function (_ref, onData) {
    var context = _ref.context,
        collectionName = _ref.collectionName,
        props = (0, _objectWithoutProperties3.default)(_ref, ['context', 'collectionName']);

    var _context = context(),
        _context$adminContext = _context.adminContext,
        SimpleSchema1 = _context$adminContext.SimpleSchema,
        getComponent = _context$adminContext.getComponent,
        publicationUtils = _context$adminContext.publicationUtils,
        config = _context$adminContext.config;

    var SimpleSchema = void 0;
    try {
      /* eslint global-require: 0 */
      SimpleSchema = require('simpl-schema').default;
    } catch (error) {
      // try to get from context
      SimpleSchema = SimpleSchema1;
    }
    if (!SimpleSchema) {
      onData(new Error('please provide SimpleSchema by npm or in context (version 1)'));
    } else {
      var searchSchema = new SimpleSchema({
        searchTerm: {
          type: String,
          optional: true
        }
      });

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
      }, colConfig, props) // allow override
      );
    }
  };
};

exports.composer = composer;

exports.default = function (type) {
  return (0, _manulMantraCore.composeWithTracker)(composer(type));
};
//# sourceMappingURL=with_collection_props.js.map