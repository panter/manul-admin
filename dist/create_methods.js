'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys2 = require('babel-runtime/core-js/object/keys');

var _keys3 = _interopRequireDefault(_keys2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _keys4 = require('lodash/keys');

var _keys5 = _interopRequireDefault(_keys4);

var _omitBy2 = require('lodash/omitBy');

var _omitBy3 = _interopRequireDefault(_omitBy2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _isDate2 = require('lodash/isDate');

var _isDate3 = _interopRequireDefault(_isDate2);

var _isObject2 = require('lodash/isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _flat = require('flat');

var _flat2 = _interopRequireDefault(_flat);

var _is_allowed = require('./is_allowed');

var _is_allowed2 = _interopRequireDefault(_is_allowed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (context, config) {
  var Meteor = context.Meteor,
      ValidatedMethod = context.ValidatedMethod;

  var SimpleSchema = void 0;
  try {
    /* eslint global-require: 0 */
    SimpleSchema = require('simpl-schema').default;
  } catch (error) {
    // try to get from context
    SimpleSchema = context.SimpleSchema;
  }
  if (!SimpleSchema) {
    throw new Error('please provide SimpleSchema by npm or in context (version 1)');
  }
  var extendSimpleSchema = function extendSimpleSchema(schema, otherSchema) {
    if (SimpleSchema.version === 2) {
      return schema.extend(otherSchema);
    }
    return new SimpleSchema([schema, otherSchema]);
  };
  var isAllowed = (0, _is_allowed2.default)(config);
  var createFor = function createFor(collectionName) {
    var _config$collections$c = config.collections[collectionName],
        collection = _config$collections$c.collection,
        allowInsertWithId = _config$collections$c.allowInsertWithId;

    return {
      update: new ValidatedMethod({
        name: 'manulAdmin.' + collectionName + '.update',
        validate: extendSimpleSchema(collection.simpleSchema(), { _id: { type: String } }).validator({ clean: true }),
        run: function run(_ref) {
          var _id = _ref._id,
              doc = (0, _objectWithoutProperties3.default)(_ref, ['_id']);

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
        validate: (allowInsertWithId ? extendSimpleSchema(collection.simpleSchema(), { _id: { type: String, optional: true } }) : collection.simpleSchema()).validator({ clean: true }),
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
        run: function run(_ref2) {
          var _id = _ref2._id;

          // console.log('inserting', doc);
          if (!isAllowed(collectionName, this.userId)) {
            throw new Meteor.Error('not allowed', 'You are not allowed');
          }
          return collection.remove(_id);
        }
      }),
      export: new ValidatedMethod({
        name: 'manulAdmin.' + collectionName + '.export',
        validate: function validate() {},
        run: function run() {
          if (Meteor.isServer) {
            // TODO: allow filtering and sorting
            if (!isAllowed(collectionName, this.userId)) {
              throw new Meteor.Error('not allowed', 'You are not allowed');
            }

            // empty objects like {} are preserved by flat, but we like to have them empty (null)
            var isEmptyObject = function isEmptyObject(field) {
              return (0, _isObject3.default)(field) && !(0, _isDate3.default)(field) && (0, _isEmpty3.default)(field);
            };
            var removeEmptyObjects = function removeEmptyObjects(doc) {
              return (0, _omitBy3.default)(doc, isEmptyObject);
            };

            // TODO: use schema to define keys

            var data = collection.find().map(_flat2.default).map(removeEmptyObjects);
            var keysSet = new _set2.default();
            data.forEach(function (entry) {
              return (0, _keys5.default)(entry).forEach(function (key) {
                return keysSet.add(key);
              });
            });
            return {
              data: data, keys: [].concat((0, _toConsumableArray3.default)(keysSet.values()))
            };
          }
          return null;
        }
      })

    };
  };

  var methods = {};
  (0, _keys3.default)(config.collections).forEach(function (collectionName) {
    methods[collectionName] = createFor(collectionName);
  });
  return methods;
};
//# sourceMappingURL=create_methods.js.map