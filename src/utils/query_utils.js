
import { omitBy, map, isObject, mapValues, keyBy, isEmpty, flow, split, trim } from 'lodash/fp';


const removeEmptyObjects = omitBy(o => isObject(o) && isEmpty(o));

const queryListFromRegex = regex => flow(
  map(field => ({
    [field]: regex,
  })),
);
const queryForTerm = term => fields => (
  {
    $or: queryListFromRegex(new RegExp(term, 'i'))(fields),
  }
);
const termToTermList = flow(split(' '), map(trim));
export const createSearchQuery = (fields, terms) => (
  {
    $and: map(term => queryForTerm(term)(fields))(terms),
  }
);
/* eslint import/prefer-default-export: 0 */
export const filterToQuery = (filter, search) => {
  // console.log('got filter', filter);
  // console.log('got search', search);

  // remove empty objects on filter

  const query = {
    ...!isEmpty(filter) && removeEmptyObjects(filter),
    ...(!isEmpty(search) && (
      createSearchQuery(search.searchFields, termToTermList(search.searchTerm))
    )),
  };
  // console.log('query is', query);
  return query;
};

const sortPropsToMongoSort = flow(
  keyBy('id'),
  mapValues(({ sortAscending }) => (sortAscending ? 1 : -1)),
);

const pagePropertiesToLimitAndSkip = (
  { currentPage, pageSize } = { currentPage: 1, pageSize: 10 },
) => ({
  limit: pageSize,
  skip: (currentPage - 1) * pageSize,
});
export const gridOptionsToQueryOptions = ({ sortProperties, pageProperties }) => {
  // console.log('got sortProperties', sortProperties);
  const sort = sortPropsToMongoSort(sortProperties);
  // console.log('mongo sort', sort);
  const limitAndSkip = pagePropertiesToLimitAndSkip(pageProperties);
  return {
    sort,
    ...limitAndSkip,
  };
};
