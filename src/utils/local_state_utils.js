export const getStateName = (name, key) =>
   `manulAdmin.${name}.${key}`
;

export const stateListFilter = name => getStateName(name, 'filter');
export const stateListSort = name => getStateName(name, 'sort');
export const statePageProperties = name => getStateName(name, 'pageProperties');

export default {
  stateListFilter,
  stateListSort,
  statePageProperties,
};
