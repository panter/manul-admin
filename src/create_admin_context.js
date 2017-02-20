import _ from 'lodash';
import createMethods from './create_methods';
import routeUtils from './utils/route_utils';
import publicationUtils from './utils/publication_utils';


export default ({
  // needed meteor dependencies
  Meteor,
  ValidatedMethod,
  Counts,
  SimpleSchema,

  config,  // admin config
  adminRoutes, // FlowRouter, manulRouter compatible routes
  components, // component definition, see readme
  /* eslint no-alert: 0*/
  gotoRoute = routeName => window.alert(`please provide a gotoRoute-function in adminContext that can jump to ${routeName}`),
  showError = error => window.alert(`an error occured: ${error.reason || error.message}`),
  showSuccess = message => window.alert(message),

}) => {
  const neededMeteorPackages = [Meteor, ValidatedMethod, Counts];
  if (_.some(neededMeteorPackages, _.isNil)) {
    throw new Error('please provide all of the following meteor-packages', neededMeteorPackages);
  }
  const methods = createMethods({ Meteor, ValidatedMethod, SimpleSchema, Counts }, config);
  const getComponent = ({ collectionName, type }) => {
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
    methods,
    getComponent,
    config,
    adminRoutes,
    gotoRoute,
    showError,
    showSuccess,
    components,
    routeUtils,
    publicationUtils,
  };
};
