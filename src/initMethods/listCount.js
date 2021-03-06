// @flow

import isAllowed from '../is_allowed';

import type {
  MethodsContextT,
  CollectionNameT,
  CollectionConfigT
} from '../types';
import { ListSchema } from '../schemas';

import getListResult from './getListResult';

export default (
  context: MethodsContextT,
  collectionName: CollectionNameT,
  collectionConfig: CollectionConfigT
) =>
  new context.ValidatedMethod({
    name: `manulAdmin.${collectionName}.listCount`,
    validate: ListSchema.validator({ clean: false }),
    async run(listOptions) {
      if (!isAllowed(collectionName, this.userId)) {
        throw new context.Meteor.Error('not allowed', 'You are not allowed');
      }
      if (context.Meteor.isClient) {
        return { docs: [], count: 0 };
      }
      this.unblock();
      const { count } = await getListResult({
        context,
        collectionConfig,
        collectionName,
        listOptions,
        getDocuments: false
      });
      return count;
    }
  });
