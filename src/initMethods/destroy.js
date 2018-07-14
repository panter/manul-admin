// @flow
import SimpleSchema from 'simpl-schema';
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
    name: `manulAdmin.${collectionName}.destroy`,
    validate: new SimpleSchema({ _id: { type: String } }).validator({
      clean: true
    }),
    run({ _id }) {
      // console.log('inserting', doc);
      if (!isAllowed(collectionName, this.userId)) {
        throw new Meteor.Error('not allowed', 'You are not allowed');
      }
      return collectionConfig.collection.remove(_id);
    }
  });
