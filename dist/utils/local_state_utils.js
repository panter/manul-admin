'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getStateName = exports.getStateName = function getStateName(name, key) {
  return 'manulAdmin.' + name + '.' + key;
};

var stateListFilter = exports.stateListFilter = function stateListFilter(name) {
  return getStateName(name, 'filter');
};
var stateListSort = exports.stateListSort = function stateListSort(name) {
  return getStateName(name, 'sort');
};
var statePageProperties = exports.statePageProperties = function statePageProperties(name) {
  return getStateName(name, 'pageProperties');
};
var stateListSearch = exports.stateListSearch = function stateListSearch(name) {
  return getStateName(name, 'search');
};

exports.default = {
  stateListFilter: stateListFilter,
  stateListSort: stateListSort,
  statePageProperties: statePageProperties,
  stateListSearch: stateListSearch
};
//# sourceMappingURL=local_state_utils.js.map