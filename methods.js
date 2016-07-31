import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export default (adminConfig) => {

  const createFor = (collectionName) => {
    const {collection} = adminConfig.collections[collectionName];
    return {
      update: new ValidatedMethod({
        name: `manulAdmin.${collectionName}.update`,
        validate: new SimpleSchema([ collection.simpleSchema(), {_id: {type: String}} ]).validator(),
        run({_id, ...doc}) {
          return collection.update(_id, {$set: doc});
        }
      }),
      create: new ValidatedMethod({
        name: `manulAdmin.${collectionName}.create`,
        validate: collection.simpleSchema().validator(),
        run(doc) {
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
