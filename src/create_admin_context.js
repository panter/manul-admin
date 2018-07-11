// @flow
import _ from 'lodash';

import initMethods from './initMethods';
import defaultComponents from './default_components';
import publicationUtils from './utils/publication_utils';
import routeUtils from './utils/route_utils';
import type { ContextT, CollectionNameT, ComponentTypeT } from './types';

export default ({
  // needed meteor dependencies
  Meteor,
  ValidatedMethod,
  LocalState,
  config, // admin config
  adminRoutes, // FlowRouter, manulRouter compatible routes
  components, // component definition, see readme
  /* eslint no-alert: 0*/
  gotoRoute = (routeName: string) =>
    window.alert(
      `please provide a gotoRoute-function in adminContext that can jump to ${routeName}`
    )
}: ContextT) => {
  _.defaultsDeep(components, defaultComponents);

  const neededMeteorPackages = { Meteor, ValidatedMethod, LocalState };
  if (_.some(neededMeteorPackages, _.isNil)) {
    throw new Error(
      `please provide all of 
      the following meteor-packages: ${_.keys(neededMeteorPackages).join(', ')}`
    );
  }

  const methods = initMethods({
    Meteor,
    ValidatedMethod,
    config
  });
  const getComponent = ({
    collectionName,
    type
  }: {
    collectionName: CollectionNameT,
    type: ComponentTypeT
  }) => {
    let Component = null;
    if (_.isFunction(components[type])) {
      Component = components[type];
    } else if (_.has(components, [type, collectionName])) {
      Component = components[type][collectionName];
    } else {
      Component = components[type].default;
    }
    Component.displayName = `Admin_${collectionName}_${type}`;
    return Component;
  };
  return {
    Meteor,
    LocalState,
    methods,
    getComponent,
    config,
    adminRoutes,
    gotoRoute,
    components,
    routeUtils,
    publicationUtils
  };
};
