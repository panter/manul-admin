const getListRoute = name => ({
  name: `admin.${name}.list`,
  path: `/${name}`
});
const getListAggregationRoute = (collectionName, aggregationName) => ({
  name: `admin.${collectionName}.listAggregation.${aggregationName}`,
  path: `/${collectionName}/aggregations/${aggregationName}`
});
const getEditRoute = name => ({
  name: `admin.${name}.edit`,
  path: `/${name}/:_id/edit`
});
const getCreateRoute = name => ({
  name: `admin.${name}.create`,
  path: `/${name}/create`
});

const getRoute = (type, ...args) => {
  switch (type) {
    case 'list':
      return getListRoute(...args);
    case 'listAggregation':
      return getListAggregationRoute(...args);
    case 'edit':
      return getEditRoute(...args);
    case 'create':
      return getCreateRoute(...args);
    default:
      throw new Error('unknown route type', type);
  }
};

export default { getRoute, getListRoute, getEditRoute, getCreateRoute };
