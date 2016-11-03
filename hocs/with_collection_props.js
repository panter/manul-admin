
import { composeWithTracker } from 'mantra-core';
import _ from 'lodash';

export const composer = () => ({ context, collectionName, type, ...props }, onData) => {
  const { adminContext: { components, gotoRoute, publicationUtils, routeUtils, config } } = context();
  const { collections } = config;
  const publications = publicationUtils.getPublications(collectionName);
  const { collection, schema, ...colConfig } = collections[collectionName];
  let Component;
  if (_.isFunction(components[type])) {
    Component = components[type];
  } else if (_.has(components, [type, collectionName])) {
    Component = components[type][collectionName];
  } else {
    Component = components[type].default;
  }
  Component.displayName = `Admin_${collectionName}_${type}`;
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


export default () => composeWithTracker(composer());
