const getListRoute = name => ({
  name: `admin.${name}.list`,
  path: `/${name}`,
});
const getEditRoute = name => ({
  name: `admin.${name}.edit`,
  path: `/${name}/:_id/edit`,
});
const getCreateRoute = name => ({
  name: `admin.${name}.create`,
  path: `/${name}/create`,
});

const getRoute = (type, name) => {
  switch (type) {
    case 'list': return getListRoute(name);
    case 'edit': return getEditRoute(name);
    case 'create': return getCreateRoute(name);
    default: throw new Error('unknown route type', type);
  }
};


export default { getRoute, getListRoute, getEditRoute, getCreateRoute };
