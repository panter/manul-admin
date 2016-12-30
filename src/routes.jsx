import React from 'react';
import { mount } from 'react-mounter';
import routeUtils from './utils/route_utils';

import Edit from './containers/edit';
import List from './containers/list';
import Create from './containers/create';

const containers = {
  edit: Edit,
  create: Create,
  list: List,
};

/* eslint react/display-name: 0*/
export default (injectDeps, { adminContext }) => {
  const { adminRoutes, components, config } = adminContext;
  Object.keys(config.collections).forEach((collectionName) => {
    ['create', 'list', 'edit'].forEach((type) => {
      const { path, name } = routeUtils.getRoute(type, collectionName);
      const Container = containers[type];
      adminRoutes.route(path, {
        name,
        action(params) {
          mount(injectDeps(components.layout), {
            content: () => (
              <Container
                collectionName={collectionName}
                type={type}
                params={params}
              />
              ),
          });
        },
      });
    });
  });
};
