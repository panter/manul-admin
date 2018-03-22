import {
  identity,
  capitalize,
  omitBy,
  map,
  isObject,
  mapValues,
  keyBy,
  isEmpty,
  flow,
  split,
  trim
} from 'lodash/fp';

const removeEmptyObjects = omitBy(o => isObject(o) && isEmpty(o));

const queryListFromTerm = (term, transform) =>
  flow(
    map(field => ({
      [field]: new RegExp(`^${transform(term)}`)
    }))
  );
// using case-insensitive regex makes it slow, so we do a little hack
const queryForTerm = term => fields => ({
  $or: [
    ...queryListFromTerm(term, identity)(fields),
    ...queryListFromTerm(term, capitalize)(fields)
  ]
});
const termToTermList = term =>
  term
    .match(/\w+|"(?:\\"|[^"])+"/g)
    .map(k => k.replace(/"/g, ''))
    .map(trim);
export const createSearchQuery = (fields, terms) => ({
  $and: map(term => queryForTerm(term)(fields))(terms)
});
/* eslint import/prefer-default-export: 0 */
export const filterToQuery = (filter, search, transformFilter = f => f) => {
  // console.log('got filter', filter);
  // console.log('got search', search);

  // remove empty objects on filter
  const query = {
    ...(!isEmpty(filter) && removeEmptyObjects(transformFilter(filter))),
    ...(!isEmpty(search) &&
      !isEmpty(search.searchFields) &&
      !isEmpty(search.searchTerm) &&
      createSearchQuery(search.searchFields, termToTermList(search.searchTerm)))
  };
  return query;
};

export const sortPropsToMongoSort = flow(
  keyBy('id'),
  mapValues(({ sortAscending }) => (sortAscending ? 1 : -1))
);

const pagePropertiesToLimitAndSkip = (
  { currentPage, pageSize } = { currentPage: 1, pageSize: 50 }
) => ({
  limit: pageSize,
  skip: (currentPage - 1) * pageSize
});

export const gridOptionsToQueryOptions = ({
  sortProperties,
  pageProperties = null
}) => {
  // console.log('got sortProperties', sortProperties);
  const sort = sortPropsToMongoSort(sortProperties);
  // console.log('mongo sort', sort);

  const limitAndSkip = pageProperties
    ? pagePropertiesToLimitAndSkip(pageProperties)
    : null;
  return {
    sort,
    ...limitAndSkip
  };
};
