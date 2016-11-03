import routeUtils from './route_utils';
import { mount } from 'react-mounter';
import React from 'react';


export default (injectDeps, { adminContext }) => {
  const { adminRoutes, components, config } = adminContext;
  for (const collectionName of Object.keys(config.collections)) {
    for (const type of ['create', 'list', 'edit']) {
      const { path, name } = routeUtils.getRoute(type, collectionName);
      const Component = adminContext.getCollectionComponent({ collectionName, type });
      adminRoutes.route(path, {
        name,
        action(params) {
          mount(injectDeps(components.layout), {
            content: () => (<CollectionComponent params={params} />),
          });
        },
      });
    }
  }
};
