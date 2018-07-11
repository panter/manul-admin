// @flow

import isAllowed from '../is_allowed';

import type {
  MethodsContextT,
  CollectionNameT,
  CollectionConfigT
} from '../types';
import { ListSchema } from '../schemas';

import { getListQueryAndOptions } from './utils';

const DEBUG = false;

export default (
  context: MethodsContextT,
  collectionName: CollectionNameT,
  collectionConfig: CollectionConfigT
) =>
  new context.ValidatedMethod({
    name: `manulAdmin.${collectionName}.list`,
    validate: ListSchema.validator({ clean: false }),
    run(options) {
      if (!isAllowed(collectionName, this.userId)) {
        throw new context.Meteor.Error('not allowed', 'You are not allowed');
      }
      this.unblock();
      const { query, queryOptions } = getListQueryAndOptions(
        context,
        collectionName,
        collectionConfig,
        options
      );

      if (DEBUG) console.time('docs');

      const docs = collectionConfig.collection
        .find(query, queryOptions)
        .fetch();
      if (DEBUG) console.timeEnd('docs');
      if (DEBUG) console.time('count');
      const count = collectionConfig.collection.find(query).count();
      if (DEBUG) console.timeEnd('count');
      return {
        docs,
        count
      };
    }
  });
