// @flow

import isAllowed from '../is_allowed';

import type {
  MethodsContextT,
  CollectionNameT,
  CollectionConfigT,
  ListOptionsT
} from '../types';
import { ListSchema } from '../schemas';

import getListResult from './getListResult';

export default (
  context: MethodsContextT,
  collectionName: CollectionNameT,
  collectionConfig: CollectionConfigT
) =>
  new context.ValidatedMethod({
    name: `manulAdmin.${collectionName}.list`,
    validate: ListSchema.validator({ clean: false }),
    run(listOptions: ListOptionsT) {
      if (!isAllowed(collectionName, this.userId)) {
        throw new context.Meteor.Error('not allowed', 'You are not allowed');
      }
      if (context.Meteor.isClient) {
        return { docs: [], count: 0 };
      }
      this.unblock();
      const { docs, count } = getListResult({
        context,
        collectionConfig,
        collectionName,
        listOptions
      });

      return {
        docs,
        count
      };
    }
  });
