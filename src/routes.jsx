import { isEmpty, upperFirst } from 'lodash/fp';
import React from 'react';

import routeUtils from './utils/route_utils';

import * as containers from './containers';

/* eslint react/display-name: 0*/
export default (injectDeps, { adminContext }) => {
  const { adminRoutes, components, config } = adminContext;

  const createRoute = (type, collectionName, aggregationName = null) => {
    const Container = containers[upperFirst(type)];
    const { path, name } = routeUtils.getRoute(
      type,
      collectionName,
      aggregationName
    );
    adminRoutes.route(path, {
      name,
      action(params) {
        const mountFunc = config.useReactMounter // useReactMounter is deprecated
          ? require('react-mounter').mount
          : this.render;
        mountFunc(injectDeps(components.layout), {
          content: () => (
            <Container
              collectionName={collectionName}
              aggregationName={aggregationName}
              type={type}
              params={params}
            />
          )
        });
      }
    });
  };
  Object.keys(config.collections).forEach(collectionName => {
    ['create', 'list', 'edit'].forEach(type => {
      createRoute(type, collectionName);
    });
  });
};
