'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composer = undefined;

var _result2 = require('lodash/result');

var _result3 = _interopRequireDefault(_result2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _mantraCore = require('mantra-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var composer = function composer(type) {
  return function (_ref, onData) {
    var context = _ref.context,
        collectionName = _ref.collectionName,
        props = _objectWithoutProperties(_ref, ['context', 'collectionName']);

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
        colConfig = _objectWithoutProperties(_collections$collecti, ['collection', 'schema']);

    var Component = getComponent({ collectionName: collectionName, type: type });
    onData(null, _extends({
      Component: Component,
      collection: collection,
      schema: schema || (0, _result3.default)(collection, 'simpleSchema'),
      publications: publications
    }, colConfig, props));
  };
};

exports.composer = composer;

exports.default = function (type) {
  return (0, _mantraCore.composeWithTracker)(composer(type));
};
//# sourceMappingURL=with_collection_props.js.map