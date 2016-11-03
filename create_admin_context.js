import createMethods from './create_methods';
import GetCollectionComponent from './get_collection_component';

import routeUtils from './route_utils';

import publicationUtils from './publication_utils';

export default ({ config, adminRoutes, gotoRoute, showError, showSuccess, components }) => {
  const methods = createMethods(config);
  const getCollectionComponent = GetCollectionComponent({ config, gotoRoute, components });

  return {
    getCollectionComponent,
    methods,
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
