'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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
          if (Meteor.isServer) {
            if (!isAllowed(collectionName, this.userId)) {
              throw new Meteor.Error('not allowed', 'You are not allowed');
            }

            // Whole-doc update is not supported by simpl-schema,
            // as workaround we use bypassCollection2: true
            // https://github.com/aldeed/meteor-simple-schema/issues/175
            var updated = collection.update(_id, { $set: doc }, { bypassCollection2: true });
            if (updated === 0) {
              throw new Meteor.Error('not found', 'Entry not found');
            }
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
      })

    };
  };

  var methods = {};
  (0, _keys2.default)(config.collections).forEach(function (collectionName) {
    methods[collectionName] = createFor(collectionName);
  });
  return methods;
};
//# sourceMappingURL=create_methods.js.map