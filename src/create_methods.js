
import SimpleSchema from 'simpl-schema';
import flatten from 'flat';
import _ from 'lodash';
import IsAllowed from './is_allowed';


export default ({ Meteor, ValidatedMethod }, config) => {
  const isAllowed = IsAllowed(config);
  const createFor = (collectionName) => {
    const { collection, allowInsertWithId } = config.collections[collectionName];
    return {
      update: new ValidatedMethod({
        name: `manulAdmin.${collectionName}.update`,
        validate: collection.simpleSchema()
        .extend({ _id: { type: String } })
        .validator({ clean: true }),
        run({ _id, ...doc }) {
          // console.log('updating', collectionName, _id, doc);
          if (!isAllowed(collectionName, this.userId)) {
            throw new Meteor.Error('not allowed', 'You are not allowed');
          }

          const updated = collection.update(_id, { $set: doc });
          if (updated === 0) {
            throw new Meteor.Error('not found', 'Entry not found');
          }
        },
      }),
      create: new ValidatedMethod({
        name: `manulAdmin.${collectionName}.create`,
        validate: (allowInsertWithId ?
          collection.simpleSchema().extend({ _id: { type: String, optional: true } }) :
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
      export: new ValidatedMethod({
        name: `manulAdmin.${collectionName}.export`,
        validate() {},
        run() {
          if (Meteor.isServer) {
            // TODO: allow filtering and sorting
            if (!isAllowed(collectionName, this.userId)) {
              throw new Meteor.Error('not allowed', 'You are not allowed');
            }

            // empty objects like {} are preserved by flat, but we like to have them empty (null)
            const isEmptyObject = (
              field => _.isObject(field) && !_.isDate(field) && _.isEmpty(field)
            );
            const removeEmptyObjects = doc => _.omitBy(doc, isEmptyObject);

            // TODO: use schema to define keys

            const data = collection.find().map(flatten).map(removeEmptyObjects);
            const keysSet = new Set();
            data.forEach(entry => _.keys(entry).forEach(key => keysSet.add(key)));
            return {
              data, keys: [...keysSet.values()],
            };
          }
          return null;
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
