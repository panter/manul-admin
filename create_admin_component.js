
import publicationUtils from './publication_utils';
import routeUtils from './route_utils';
import _ from 'lodash';
import React from 'react';

/**
this function is used in manul-admin/routes to create components.

it can be used stand-alone when provided with adminContext and adminConfig,
but this is experimental atm.
*/

export const createProps = ({ adminContext: { gotoRoute }, adminConfig }, collectionName) => {
  const publications = publicationUtils.getPublications(collectionName);
  const { collection, schema, ...colConfig } = adminConfig.collections[collectionName];
  return {
    collectionName,
    gotoCreate: () => gotoRoute(routeUtils.getCreateRoute(collectionName).name),
    gotoEdit: _id => gotoRoute(routeUtils.getEditRoute(collectionName).name, { _id }),
    gotoList: () => gotoRoute(routeUtils.getListRoute(collectionName).name),
    collection,
    schema: schema || collection.simpleSchema(),
    colConfig,
    publications,
  };
};

export default ({ adminContext, adminConfig, collectionName, type }) => {
  const { components } = adminContext;
  const _props = createProps({ adminContext, adminConfig }, collectionName);
  let BaseComponent;
  if (_.isFunction(components[type])) {
    BaseComponent = components[type];
  } else if (_.has(components, [type, collectionName])) {
    BaseComponent = components[type][collectionName];
  } else {
    BaseComponent = components[type].default;
  }
  const Component = props => <BaseComponent {..._props} {...props} />;
  Component.displayName = `Admin_${collectionName}_${type}`;
  return Component;
};
