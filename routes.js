import routeUtils from './route_utils';
import publicationUtils from './publication_utils';
import { mount } from 'react-mounter';
import _ from 'lodash';
import React from 'react';

import createAdminComponent from './create_admin_component';

export default (adminConfig) => {
  const routes = (injectDeps, { adminContext }) => {
    const { adminRoutes, components } = adminContext;
    for (const collectionName of Object.keys(adminConfig.collections)) {
      for (const type of ['create', 'list', 'edit']) {
        const { path, name } = routeUtils.getRoute(type, collectionName);
        const Component = createAdminComponent({ adminConfig, adminContext, collectionName, type });
        adminRoutes.route(path, {
          name,
          action(params) {
            mount(injectDeps(components.layout), {
              content: () => (<Component params={params} />),
            });
          },
        });
      }
    }
  };

  return routes;
};
