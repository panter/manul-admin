import routeUtils from './route_utils';
import publicationUtils from './publication_utils';
import { mount } from 'react-mounter';

export default (adminConfig) => {
  const getProps = ({gotoRoute}, name) => {
    const publications = publicationUtils.getPublications(name);
    const {collection, ...colConfig} = adminConfig.collections[name];
    return {
      collectionName: name,
      gotoCreate: () => gotoRoute(routeUtils.getCreateRoute(name).name),
      gotoEdit: (_id) => gotoRoute(routeUtils.getEditRoute(name).name, {_id}),
      gotoList: () => gotoRoute(routeUtils.getListRoute(name).name),
      collection,
      colConfig,
      publications
    };
  }
  const routes = (injectDeps, {adminContext}) => {
    const {adminRoutes, components} = adminContext;
    for (const collectionName of Object.keys(adminConfig.collections)) {
      for (const type of [ 'create', 'list', 'edit' ]) {

        const {path, name} = routeUtils.getRoute(type, collectionName);
        const props = getProps(adminContext, collectionName);
        const Component = components[type];
        adminRoutes.route(path, {
          name,
          action(params) {
            mount(injectDeps(components.layout), {
              content: () => (<Component {...props} params={params} />)
            })
          }
        });
      }
    }
  }

  return routes;
}
