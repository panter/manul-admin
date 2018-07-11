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
    name: `manulAdmin.${collectionName}.update`,
    validate: collectionConfig.collection
      .simpleSchema()
      .extend({
        _id: { type: String }
      })
      .validator({ clean: true }),
    run({ _id, ...doc }) {
      // console.log('updating', collectionName, _id, doc);
      if (Meteor.isServer) {
        if (!isAllowed(collectionName, this.userId)) {
          throw new Meteor.Error('not allowed', 'You are not allowed');
        }

        // Whole-doc update is not supported by simpl-schema,
        // as workaround we use bypassCollection2: true
        // https://github.com/aldeed/meteor-simple-schema/issues/175
        const updated = collectionConfig.collection.update(
          _id,
          { $set: doc },
          { bypassCollection2: true }
        );
        if (updated === 0) {
          throw new Meteor.Error('not found', 'Entry not found');
        }
      }
    }
  });
