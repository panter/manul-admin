import routeUtils from './route_utils';
import publicationUtils from './publication_utils';
import { mount } from 'react-mounter';
import _ from 'lodash';

export default (adminConfig) => {
  const getProps = ({ gotoRoute }, name) => {
    const publications = publicationUtils.getPublications(name);
    const { collection, schema, ...colConfig } = adminConfig.collections[name];

    return {
      collectionName: name,
      gotoCreate: () => gotoRoute(routeUtils.getCreateRoute(name).name),
      gotoEdit: (_id) => gotoRoute(routeUtils.getEditRoute(name).name, { _id }),
      gotoList: () => gotoRoute(routeUtils.getListRoute(name).name),
      collection,
      schema: schema || collection.simpleSchema(),
      colConfig,
      publications,
    };
  };
  const routes = (injectDeps, { adminContext }) => {
    const { adminRoutes, components } = adminContext;
    for (const collectionName of Object.keys(adminConfig.collections)) {
      for (const type of ['create', 'list', 'edit']) {
        const { path, name } = routeUtils.getRoute(type, collectionName);
        const props = getProps(adminContext, collectionName);
        let Component;

        if (_.isFunction(components[type])) {
          Component = components[type];
        } else if (_.has(components, [type, collectionName])) {
          Component = components[type][collectionName];
        } else {
          Component = components[type].default;
        }

        adminRoutes.route(path, {
          name,
          action(params) {
            mount(injectDeps(components.layout), {
              content: () => (<Component {...props} params={params} />),
            });
          },
        });
      }
    }
  };

  return routes;
};
