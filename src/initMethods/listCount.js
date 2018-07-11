// @flow

import isAllowed from '../is_allowed';

import type {
  MethodsContextT,
  CollectionNameT,
  CollectionConfigT
} from '../types';
import { ListSchema } from '../schemas';

import { getListQueryAndOptions } from './utils';

export default (
  context: MethodsContextT,
  collectionName: CollectionNameT,
  collectionConfig: CollectionConfigT
) =>
  new context.ValidatedMethod({
    name: `manulAdmin.${collectionName}.listCount`,
    validate: ListSchema.validator({ clean: false }),
    run(options) {
      if (!isAllowed(collectionName, this.userId)) {
        throw new context.Meteor.Error('not allowed', 'You are not allowed');
      }
      this.unblock();
      const { query } = getListQueryAndOptions(
        context,
        collectionName,
        collectionConfig,
        options
      );
      return collectionConfig.collection.find(query).count();
    }
  });
