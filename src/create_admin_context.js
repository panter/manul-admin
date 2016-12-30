import _ from 'lodash';
import createMethods from './create_methods';
import routeUtils from './utils/route_utils';
import publicationUtils from './utils/publication_utils';


export default ({ config, adminRoutes, gotoRoute, showError, showSuccess, components }) => {
  const methods = createMethods(config);
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
