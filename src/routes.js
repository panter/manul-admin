import routeUtils from './utils/route_utils';
import { mount } from 'react-mounter';
import React from 'react';

import Edit from './containers/edit';
import List from './containers/list';
import Create from './containers/create';

const containers = {
  edit: Edit,
  create: Create,
  list: List,
};

export default (injectDeps, { adminContext }) => {
  const { adminRoutes, components, config } = adminContext;
  for (const collectionName of Object.keys(config.collections)) {
    for (const type of ['create', 'list', 'edit']) {
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
    }
  }
};
