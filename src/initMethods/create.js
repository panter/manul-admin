// @flow
import isAllowed from '../is_allowed';

import type {
  MethodsContextT,
  CollectionNameT,
  CollectionConfigT
} from '../types';

export default (
  { ValidatedMethod, Meteor }: MethodsContextT,
  collectionName: CollectionNameT,
  collectionConfig: CollectionConfigT
) =>
  new ValidatedMethod({
    name: `manulAdmin.${collectionName}.create`,
    validate: (collectionConfig.allowInsertWithId
      ? collectionConfig.collection.simpleSchema().extend({
          _id: { type: String, optional: true }
        })
      : collectionConfig.collection.simpleSchema()
    ).validator({ clean: true }),
    run(doc) {
      // console.log('inserting', doc);
      if (!isAllowed(collectionName, this.userId)) {
        throw new Meteor.Error('not allowed', 'You are not allowed');
      }
      return collectionConfig.collection.insert(doc);
    }
  });
