'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var getStateName = function getStateName(name, key) {
  return 'manulAdmin.' + name + '.' + key;
};

exports.getStateName = getStateName;
var stateListFilter = function stateListFilter(name) {
  return getStateName(name, 'filter');
};
exports.stateListFilter = stateListFilter;
var stateListSort = function stateListSort(name) {
  return getStateName(name, 'sort');
};
exports.stateListSort = stateListSort;
var statePageProperties = function statePageProperties(name) {
  return getStateName(name, 'pageProperties');
};

exports.statePageProperties = statePageProperties;
exports['default'] = {
  stateListFilter: stateListFilter,
  stateListSort: stateListSort,
  statePageProperties: statePageProperties
};
//# sourceMappingURL=local_state_utils.js.map