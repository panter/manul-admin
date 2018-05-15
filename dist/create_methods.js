"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _query_utils = require("./utils/query_utils");

var _is_allowed = require("./is_allowed");

var _is_allowed2 = _interopRequireDefault(_is_allowed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEBUG = false;

var logObject = function logObject(obj) {
  function replacer(key, value) {
    if (value instanceof RegExp) return "__REGEXP " + value.toString();
    return value;
  }

  console.log((0, _stringify2.default)(obj, replacer, 2));
};

exports.default = function (context, config) {
  var Meteor = context.Meteor,
      ValidatedMethod = context.ValidatedMethod;

  var SimpleSchema = void 0;
  try {
    /* eslint global-require: 0 */
    SimpleSchema = require("simpl-schema").default;
  } catch (error) {
    // try to get from context
    SimpleSchema = context.SimpleSchema;
  }
  if (!SimpleSchema) {
    throw new Error("please provide SimpleSchema by npm or in context (version 1)");
  }
  var ListSchema = new SimpleSchema({
    filter: {
      type: Object,
      optional: true,
      blackbox: true
    },
    searchTerm: {
      type: String,
      optional: true
    },
    sortProperties: {
      type: Array,
      optional: true
    },
    "sortProperties.$": {
      type: Object,
      optional: true,
      blackbox: true
    },
    pageProperties: {
      type: Object,
      optional: true,
      blackbox: true
    }
  });
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
        allowInsertWithId = _config$collections$c.allowInsertWithId,
        searchFields = _config$collections$c.searchFields,
        transformFilter = _config$collections$c.transformFilter,
        textIndex = _config$collections$c.textIndex;

    var hasTextIndex = Meteor.isServer && Boolean(textIndex);

    var getListQueryAndOptions = function getListQueryAndOptions(_ref) {
      var filter = _ref.filter,
          _ref$searchTerm = _ref.searchTerm,
          searchTerm = _ref$searchTerm === undefined ? null : _ref$searchTerm,
          sortProperties = _ref.sortProperties,
          pageProperties = _ref.pageProperties;

      var query = (0, _query_utils.filterToQuery)(filter, searchTerm && { searchFields: searchFields, searchTerm: searchTerm }, transformFilter, hasTextIndex);

      var queryOptions = (0, _query_utils.gridOptionsToQueryOptions)({
        sortProperties: sortProperties,
        pageProperties: pageProperties
      });
      if (DEBUG) logObject({ searchTerm: searchTerm, query: query, queryOptions: queryOptions });

      return {
        query: query,
        queryOptions: queryOptions
      };
    };

    return {
      update: new ValidatedMethod({
        name: "manulAdmin." + collectionName + ".update",
        validate: extendSimpleSchema(collection.simpleSchema(), {
          _id: { type: String }
        }).validator({ clean: true }),
        run: function run(_ref2) {
          var _id = _ref2._id,
              doc = (0, _objectWithoutProperties3.default)(_ref2, ["_id"]);

          // console.log('updating', collectionName, _id, doc);
          if (Meteor.isServer) {
            if (!isAllowed(collectionName, this.userId)) {
              throw new Meteor.Error("not allowed", "You are not allowed");
            }

            // Whole-doc update is not supported by simpl-schema,
            // as workaround we use bypassCollection2: true
            // https://github.com/aldeed/meteor-simple-schema/issues/175
            var updated = collection.update(_id, { $set: doc }, { bypassCollection2: true });
            if (updated === 0) {
              throw new Meteor.Error("not found", "Entry not found");
            }
          }
        }
      }),
      create: new ValidatedMethod({
        name: "manulAdmin." + collectionName + ".create",
        validate: (allowInsertWithId ? extendSimpleSchema(collection.simpleSchema(), {
          _id: { type: String, optional: true }
        }) : collection.simpleSchema()).validator({ clean: true }),
        run: function run(doc) {
          // console.log('inserting', doc);
          if (!isAllowed(collectionName, this.userId)) {
            throw new Meteor.Error("not allowed", "You are not allowed");
          }
          return collection.insert(doc);
        }
      }),
      destroy: new ValidatedMethod({
        name: "manulAdmin." + collectionName + ".destroy",
        validate: new SimpleSchema({ _id: { type: String } }).validator({
          clean: true
        }),
        run: function run(_ref3) {
          var _id = _ref3._id;

          // console.log('inserting', doc);
          if (!isAllowed(collectionName, this.userId)) {
            throw new Meteor.Error("not allowed", "You are not allowed");
          }
          return collection.remove(_id);
        }
      }),
      list: new ValidatedMethod({
        name: "manulAdmin." + collectionName + ".list",
        validate: ListSchema.validator({ clean: false }),
        run: function run(options) {
          if (!isAllowed(collectionName, this.userId)) {
            throw new Meteor.Error("not allowed", "You are not allowed");
          }
          this.unblock();

          var _getListQueryAndOptio = getListQueryAndOptions(options),
              query = _getListQueryAndOptio.query,
              queryOptions = _getListQueryAndOptio.queryOptions;

          return {
            docs: collection.find(query, queryOptions).fetch(),
            count: collection.find(query).count()
          };
        }
      }),
      listCount: new ValidatedMethod({
        name: "manulAdmin." + collectionName + ".listCount",
        validate: ListSchema.validator({ clean: false }),
        run: function run(options) {
          if (!isAllowed(collectionName, this.userId)) {
            throw new Meteor.Error("not allowed", "You are not allowed");
          }
          this.unblock();

          var _getListQueryAndOptio2 = getListQueryAndOptions(options),
              query = _getListQueryAndOptio2.query;

          return collection.find(query).count();
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