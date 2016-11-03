
import { composeWithTracker } from 'mantra-core';


export const composer = () => ({ context, collectionName, ...props }, onData) => {
  const { adminContext: { gotoRoute, publicationUtils, routeUtils, config } } = context();

  const publications = publicationUtils.getPublications(collectionName);
  const { collection, schema, ...colConfig } = config.collections[collectionName];
  onData(null, {
    gotoCreate: () => gotoRoute(routeUtils.getCreateRoute(collectionName).name),
    gotoEdit: _id => gotoRoute(routeUtils.getEditRoute(collectionName).name, { _id }),
    gotoList: () => gotoRoute(routeUtils.getListRoute(collectionName).name),
    collection,
    schema: schema || collection.simpleSchema(),
    publications,
    ...colConfig,
    ...props, // allow override
  });
};


export default () => composeWithTracker(composer());
