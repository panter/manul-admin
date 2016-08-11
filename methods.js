import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import IsAllowed from './is_allowed';
import {Meteor} from 'meteor/meteor';
import flatten from 'flat';
import _ from 'lodash';

export default (adminConfig) => {
  const isAllowed = IsAllowed(adminConfig);
  const createFor = (collectionName) => {
    const {collection} = adminConfig.collections[collectionName];
    return {
      update: new ValidatedMethod({
        name: `manulAdmin.${collectionName}.update`,
        validate: new SimpleSchema([ collection.simpleSchema(), {_id: {type: String}} ]).validator(),
        run({_id, ...doc}) {
          if (!isAllowed(collectionName, this.userId)) {
            throw new Meteor.Error('not allowed', 'You are not allowed');
          }
          return collection.update(_id, {$set: doc});
        }
      }),
      create: new ValidatedMethod({
        name: `manulAdmin.${collectionName}.create`,
        validate: collection.simpleSchema().validator(),
        run(doc) {
          if (!isAllowed(collectionName, this.userId)) {
            throw new Meteor.Error('not allowed', 'You are not allowed');
          }
          return collection.insert(doc);
        }
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
            const isEmptyObject = (field) => _.isObject(field) && _.isEmpty(field)
            const removeEmptyObjects = (doc) => _.omitBy(doc, isEmptyObject);
            // TODO: use schema to define keys
            return collection.find().map(flatten).map(removeEmptyObjects)
          }
        }
      }),

    }
  }

  const methods = {
  }
  Object.keys(adminConfig.collections).forEach((collectionName) => {
    methods[collectionName] = createFor(collectionName);
  })
  return methods;


}
