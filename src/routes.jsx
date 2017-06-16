import { isEmpty, upperFirst } from 'lodash/fp';
import React from 'react';
import { mount } from 'react-mounter';
import routeUtils from './utils/route_utils';
import Layout from './containers/layout';
import Home from './containers/admin_home';

import * as composers from './containers/composers';

/* eslint react/display-name: 0*/
export default (injectDeps, { adminContext }) => {
  const { adminRoutes, config } = adminContext;

  adminRoutes.route('/', {
    name: 'admin.index',
    action() {
      mount(injectDeps(Layout), {
        content: () => (
          <Home />
        ),
      });
    },
  });

  const createRoute = (type, collectionName, aggregationName = null) => {
    const Container = composers[upperFirst(type)];
    const { path, name } = routeUtils.getRoute(type, collectionName, aggregationName);
    adminRoutes.route(path, {
      name,
      action(params) {
        mount(injectDeps(Layout), {
          content: () => (
            <Container
              collectionName={collectionName}
              aggregationName={aggregationName}
              type={type}
              params={params}
            />
            ),
        });
      },
    });
  };
  Object.keys(config.collections).forEach((collectionName) => {
    ['create', 'list', 'edit'].forEach((type) => {
      createRoute(type, collectionName);
    });
    const { aggregations } = config.collections[collectionName];
    if (!isEmpty(aggregations)) {
      Object.keys(aggregations).forEach((aggregationName) => {
        createRoute('listAggregation', collectionName, aggregationName);
      });
    }
  });
};
