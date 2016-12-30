
import { composeWithTracker } from 'mantra-core';


export const composer = type => ({ context, collectionName, ...props }, onData) => {
  const {
    adminContext: {
      getComponent, gotoRoute, publicationUtils, routeUtils, config,
    },
  } = context();
  const { collections } = config;
  const publications = publicationUtils.getPublications(collectionName);
  const { collection, schema, ...colConfig } = collections[collectionName];
  const Component = getComponent({ collectionName, type });
  onData(null, {
    Component,
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


export default type => composeWithTracker(composer(type));
