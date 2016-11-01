import createMethods from './create_methods';
import GetCollectionComponent from './get_collection_component';

export default ({ config, adminRoutes, gotoRoute, showError, showSuccess, components }) => {
  const methods = createMethods(config);
  const getCollectionComponent = GetCollectionComponent({ config, gotoRoute, components });
  return {
    getCollectionComponent, methods, config, adminRoutes, gotoRoute, showError, showSuccess, components,
  };
};
