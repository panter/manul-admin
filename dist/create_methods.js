'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _Set = require('babel-runtime/core-js/set')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _flat = require('flat');

var _flat2 = _interopRequireDefault(_flat);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _is_allowed = require('./is_allowed');

var _is_allowed2 = _interopRequireDefault(_is_allowed);

exports['default'] = function (_ref, config) {
  var Meteor = _ref.Meteor;
  var ValidatedMethod = _ref.ValidatedMethod;
  var SimpleSchema = _ref.SimpleSchema;

  var isAllowed = (0, _is_allowed2['default'])(config);
  var createFor = function createFor(collectionName) {
    var _config$collections$collectionName = config.collections[collectionName];
    var collection = _config$collections$collectionName.collection;
    var allowInsertWithId = _config$collections$collectionName.allowInsertWithId;

    return {
      update: new ValidatedMethod({
        name: 'manulAdmin.' + collectionName + '.update',
        validate: new SimpleSchema([collection.simpleSchema(), { _id: { type: String } }]).validator({ clean: true }),
        run: function run(_ref2) {
          var _id = _ref2._id;

          var doc = _objectWithoutProperties(_ref2, ['_id']);

          // console.log('updating', collectionName, _id, doc);
          if (!isAllowed(collectionName, this.userId)) {
            throw new Meteor.Error('not allowed', 'You are not allowed');
          }

          var updated = collection.update(_id, { $set: doc });
          if (updated === 0) {
            throw new Meteor.Error('not found', 'Entry not found');
          }
        }
      }),
      create: new ValidatedMethod({
        name: 'manulAdmin.' + collectionName + '.create',
        validate: collection.simpleSchema([collection.simpleSchema(), allowInsertWithId && { _id: { type: String, optinal: true } }]).validator({ clean: true }),
        run: function run(doc) {
          // console.log('inserting', doc);
          if (!isAllowed(collectionName, this.userId)) {
            throw new Meteor.Error('not allowed', 'You are not allowed');
          }
          return collection.insert(doc);
        }
      }),
      destroy: new ValidatedMethod({
        name: 'manulAdmin.' + collectionName + '.destroy',
        validate: new SimpleSchema({ _id: { type: String } }).validator({ clean: true }),
        run: function run(_ref3) {
          var _id = _ref3._id;

          // console.log('inserting', doc);
          if (!isAllowed(collectionName, this.userId)) {
            throw new Meteor.Error('not allowed', 'You are not allowed');
          }
          return collection.remove(_id);
        }
      }),
      'export': new ValidatedMethod({
        name: 'manulAdmin.' + collectionName + '.export',
        validate: function validate() {},
        run: function run() {
          var _this = this;

          if (Meteor.isServer) {
            var _ret = (function () {
              // TODO: allow filtering and sorting
              if (!isAllowed(collectionName, _this.userId)) {
                throw new Meteor.Error('not allowed', 'You are not allowed');
              }

              // empty objects like {} are preserved by flat, but we like to have them empty (null)
              var isEmptyObject = function isEmptyObject(field) {
                return _lodash2['default'].isObject(field) && !_lodash2['default'].isDate(field) && _lodash2['default'].isEmpty(field);
              };
              var removeEmptyObjects = function removeEmptyObjects(doc) {
                return _lodash2['default'].omitBy(doc, isEmptyObject);
              };

              // TODO: use schema to define keys

              var data = collection.find().map(_flat2['default']).map(removeEmptyObjects);
              var keysSet = new _Set();
              data.forEach(function (entry) {
                return _lodash2['default'].keys(entry).forEach(function (key) {
                  return keysSet.add(key);
                });
              });
              return {
                v: {
                  data: data, keys: [].concat(_toConsumableArray(keysSet.values()))
                }
              };
            })();

            if (typeof _ret === 'object') return _ret.v;
          }
          return null;
        }
      })

    };
  };

  var methods = {};
  _Object$keys(config.collections).forEach(function (collectionName) {
    methods[collectionName] = createFor(collectionName);
  });
  return methods;
};

module.exports = exports['default'];
//# sourceMappingURL=create_methods.js.map