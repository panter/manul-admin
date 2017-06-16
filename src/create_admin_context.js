import _ from 'lodash';

import createMethods from './create_methods';
import publicationUtils from './utils/publication_utils';
import routeUtils from './utils/route_utils';


export default ({
  // needed meteor dependencies
  Meteor,
  ValidatedMethod,
  Counts,
  LocalState,
  SimpleSchema,

  config,  // admin config
  adminRoutes, // FlowRouter, manulRouter compatible routes
  components, // component definition, see readme
  /* eslint no-alert: 0*/
  gotoRoute = routeName => window.alert(`please provide a gotoRoute-function in adminContext that can jump to ${routeName}`),


}) => {
  const neededMeteorPackages = { Meteor, ValidatedMethod, Counts, LocalState };
  if (_.some(neededMeteorPackages, _.isNil)) {
    throw new Error(`please provide all of the following meteor-packages: ${_.keys(neededMeteorPackages).join(', ')}`);
  }
  const methods = createMethods({ Meteor, SimpleSchema, ValidatedMethod, Counts }, config);
  return {
    Meteor,
    LocalState,
    SimpleSchema,
    Counts,
    methods,
    config,
    adminRoutes,
    gotoRoute,
    components,
    routeUtils,
    publicationUtils,
  };
};
