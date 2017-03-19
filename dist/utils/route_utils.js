'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getListRoute = function getListRoute(name) {
  return {
    name: 'admin.' + name + '.list',
    path: '/' + name
  };
};
var getListAggregationRoute = function getListAggregationRoute(collectionName, aggregationName) {
  return {
    name: 'admin.' + collectionName + '.listAggregation.' + aggregationName,
    path: '/' + collectionName + '/aggregations/' + aggregationName
  };
};
var getEditRoute = function getEditRoute(name) {
  return {
    name: 'admin.' + name + '.edit',
    path: '/' + name + '/:_id/edit'
  };
};
var getCreateRoute = function getCreateRoute(name) {
  return {
    name: 'admin.' + name + '.create',
    path: '/' + name + '/create'
  };
};

var getRoute = function getRoute(type) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  switch (type) {
    case 'list':
      return getListRoute.apply(undefined, args);
    case 'listAggregation':
      return getListAggregationRoute.apply(undefined, args);
    case 'edit':
      return getEditRoute.apply(undefined, args);
    case 'create':
      return getCreateRoute.apply(undefined, args);
    default:
      throw new Error('unknown route type', type);
  }
};

exports.default = { getRoute: getRoute, getListRoute: getListRoute, getEditRoute: getEditRoute, getCreateRoute: getCreateRoute };
//# sourceMappingURL=route_utils.js.map