
import IsAllowed from './is_allowed';


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
    throw new Error('please provide SimpleSchema by npm or in context (version 1)');
  }
  const extendSimpleSchema = (schema, otherSchema) => {
    if (SimpleSchema.version === 2) {
      return schema.extend(otherSchema);
    }
    return new SimpleSchema([schema, otherSchema]);
  };
  const isAllowed = IsAllowed(config);
  const createFor = (collectionName) => {
    const { collection, allowInsertWithId } = config.collections[collectionName];
    return {
      update: new ValidatedMethod({
        name: `manulAdmin.${collectionName}.update`,
        validate: extendSimpleSchema(
          collection.simpleSchema(), { _id: { type: String } },
        )
        .validator({ clean: true }),
        run({ _id, ...doc }) {
          console.log('updating', collectionName, _id, doc);
          if (Meteor.isServer) {
            if (!isAllowed(collectionName, this.userId)) {
              throw new Meteor.Error('not allowed', 'You are not allowed');
            }
            const cleanSchema = collection.schema.clean(doc);
            const updated = collection.update(
              _id, { $set: cleanSchema }, { bypassCollection2: true },
            );
            if (updated === 0) {
              throw new Meteor.Error('not found', 'Entry not found');
            }
          }
        },
      }),
      create: new ValidatedMethod({
        name: `manulAdmin.${collectionName}.create`,
        validate: (allowInsertWithId ?
          extendSimpleSchema(collection.simpleSchema(), { _id: { type: String, optional: true } }) :
          collection.simpleSchema()
        ).validator({ clean: true }),
        run(doc) {
          // console.log('inserting', doc);
          if (!isAllowed(collectionName, this.userId)) {
            throw new Meteor.Error('not allowed', 'You are not allowed');
          }
          return collection.insert(doc);
        },
      }),
      destroy: new ValidatedMethod({
        name: `manulAdmin.${collectionName}.destroy`,
        validate: new SimpleSchema(
          { _id: { type: String } },
        ).validator({ clean: true }),
        run({ _id }) {
          // console.log('inserting', doc);
          if (!isAllowed(collectionName, this.userId)) {
            throw new Meteor.Error('not allowed', 'You are not allowed');
          }
          return collection.remove(_id);
        },
      }),

    };
  };

  const methods = {
  };
  Object.keys(config.collections).forEach((collectionName) => {
    methods[collectionName] = createFor(collectionName);
  });
  return methods;
};
