import { filterToQuery, gridOptionsToQueryOptions } from './utils/query_utils';
import IsAllowed from './is_allowed';

const DEBUG = false;

const logObject = obj => {
  function replacer(key, value) {
    if (value instanceof RegExp) return `__REGEXP ${value.toString()}`;
    return value;
  }

  console.log(JSON.stringify(obj, replacer, 2));
};

export default (context, config) => {
  const { Meteor, ValidatedMethod } = context;
  let SimpleSchema;
  try {
    /* eslint global-require: 0 */
    SimpleSchema = require('simpl-schema').default;
  } catch (error) {
    // try to get from context
    SimpleSchema = context.SimpleSchema;
  }
  if (!SimpleSchema) {
    throw new Error(
      'please provide SimpleSchema by npm or in context (version 1)'
    );
  }
  const ListSchema = new SimpleSchema({
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
    'sortProperties.$': {
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
  const extendSimpleSchema = (schema, otherSchema) => {
    if (SimpleSchema.version === 2) {
      return schema.extend(otherSchema);
    }
    return new SimpleSchema([schema, otherSchema]);
  };
  const isAllowed = IsAllowed(config);

  const createFor = collectionName => {
    const {
      collection,
      allowInsertWithId,
      searchFields,
      transformFilter,
      textIndex
    } = config.collections[collectionName];
    const hasTextIndex = Meteor.isServer && Boolean(textIndex);

    const getListQueryAndOptions = ({
      filter,
      searchTerm = null,
      sortProperties,
      pageProperties
    }) => {
      const query = filterToQuery(
        filter,
        searchTerm && { searchFields, searchTerm },
        transformFilter,
        hasTextIndex
      );

      const queryOptions = gridOptionsToQueryOptions({
        sortProperties,
        pageProperties
      });
      if (DEBUG) logObject({ searchTerm, query, queryOptions });

      return {
        query,
        queryOptions
      };
    };

    return {
      update: new ValidatedMethod({
        name: `manulAdmin.${collectionName}.update`,
        validate: extendSimpleSchema(collection.simpleSchema(), {
          _id: { type: String }
        }).validator({ clean: true }),
        run({ _id, ...doc }) {
          // console.log('updating', collectionName, _id, doc);
          if (Meteor.isServer) {
            if (!isAllowed(collectionName, this.userId)) {
              throw new Meteor.Error('not allowed', 'You are not allowed');
            }

            // Whole-doc update is not supported by simpl-schema,
            // as workaround we use bypassCollection2: true
            // https://github.com/aldeed/meteor-simple-schema/issues/175
            const updated = collection.update(
              _id,
              { $set: doc },
              { bypassCollection2: true }
            );
            if (updated === 0) {
              throw new Meteor.Error('not found', 'Entry not found');
            }
          }
        }
      }),
      create: new ValidatedMethod({
        name: `manulAdmin.${collectionName}.create`,
        validate: (allowInsertWithId
          ? extendSimpleSchema(collection.simpleSchema(), {
              _id: { type: String, optional: true }
            })
          : collection.simpleSchema()
        ).validator({ clean: true }),
        run(doc) {
          // console.log('inserting', doc);
          if (!isAllowed(collectionName, this.userId)) {
            throw new Meteor.Error('not allowed', 'You are not allowed');
          }
          return collection.insert(doc);
        }
      }),
      destroy: new ValidatedMethod({
        name: `manulAdmin.${collectionName}.destroy`,
        validate: new SimpleSchema({ _id: { type: String } }).validator({
          clean: true
        }),
        run({ _id }) {
          // console.log('inserting', doc);
          if (!isAllowed(collectionName, this.userId)) {
            throw new Meteor.Error('not allowed', 'You are not allowed');
          }
          return collection.remove(_id);
        }
      }),
      list: new ValidatedMethod({
        name: `manulAdmin.${collectionName}.list`,
        validate: ListSchema.validator({ clean: false }),
        run(options) {
          if (!isAllowed(collectionName, this.userId)) {
            throw new Meteor.Error('not allowed', 'You are not allowed');
          }
          this.unblock();
          const { query, queryOptions } = getListQueryAndOptions(options);

          if (DEBUG) console.time('docs');
          const docs = collection.find(query, queryOptions).fetch();
          if (DEBUG) console.timeEnd('docs');
          if (DEBUG) console.time('count');
          const count = collection.find(query).count();
          if (DEBUG) console.timeEnd('count');
          return {
            docs,
            count
          };
        }
      }),
      listCount: new ValidatedMethod({
        name: `manulAdmin.${collectionName}.listCount`,
        validate: ListSchema.validator({ clean: false }),
        run(options) {
          if (!isAllowed(collectionName, this.userId)) {
            throw new Meteor.Error('not allowed', 'You are not allowed');
          }
          this.unblock();
          const { query } = getListQueryAndOptions(options);
          return collection.find(query).count();
        }
      })
    };
  };

  const methods = {};
  Object.keys(config.collections).forEach(collectionName => {
    methods[collectionName] = createFor(collectionName);
  });
  return methods;
};
