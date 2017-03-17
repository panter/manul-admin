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

var getRoute = function getRoute(type, name) {
  switch (type) {
    case 'list':
      return getListRoute(name);
    case 'edit':
      return getEditRoute(name);
    case 'create':
      return getCreateRoute(name);
    default:
      throw new Error('unknown route type', type);
  }
};

exports.default = { getRoute: getRoute, getListRoute: getListRoute, getEditRoute: getEditRoute, getCreateRoute: getCreateRoute };
//# sourceMappingURL=route_utils.js.map