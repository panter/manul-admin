const getListRoute = (name) => {
  return {
    name: `admin.${name}.list`,
    path: `/${name}`,
  }
};
const getEditRoute = (name) => {
  return {
    name: `admin.${name}.edit`,
    path: `/${name}/:_id/edit`,
  }
}
const getCreateRoute = (name) => {
  return {
    name: `admin.${name}.create`,
    path: `/${name}/create`,
  }
}

const getRoute = (type, name) => {
  switch (type) {
    case 'list': return getListRoute(name);
    case 'edit': return getEditRoute(name);
    case 'create': return getCreateRoute(name);
  }
}


export default {getRoute, getListRoute, getEditRoute, getCreateRoute}
