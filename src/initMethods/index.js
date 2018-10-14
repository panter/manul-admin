// @flow

import update from './update';
import create from './create';
import destroy from './destroy';
import list from './list';
import listCount from './listCount';

import type {
  MethodsContextT,
  CollectionNameT,
  CollectionConfigT
} from '../types';

const initMethodsForCollection = (
  context: MethodsContextT,
  collectionName: CollectionNameT,
  collectionConfig: CollectionConfigT
) => ({
  update: update(context, collectionName, collectionConfig),
  create: create(context, collectionName, collectionConfig),
  destroy: destroy(context, collectionName, collectionConfig),
  list: list(context, collectionName, collectionConfig),
  listCount: listCount(context, collectionName, collectionConfig)
});

let METHODS = null;
export default (context: MethodsContextT) => {
  // on server, this might get called twice atm (if you use SSR)
  // so if already initialzed, do not initialize again
  if (!METHODS) {
    const methods = {};
    Object.keys(context.config.collections).forEach(collectionName => {
      const collectionConfig = context.config.collections[collectionName];

      methods[collectionName] = initMethodsForCollection(
        context,
        collectionName,
        collectionConfig
      );
    });
    METHODS = methods;
  }

  return METHODS;
};
