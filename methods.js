import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import IsAllowed from './is_allowed';
import {Meteor} from 'meteor/meteor';
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
      })
    }
  }

  const methods = {
  }
  Object.keys(adminConfig.collections).forEach((collectionName) => {
    methods[collectionName] = createFor(collectionName);
  })
  return methods;


}
