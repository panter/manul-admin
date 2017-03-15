import _ from 'lodash';import omitBy from 'lodash/fp/omitBy';

import isObject from 'lodash/fp/isObject';
import mapValues from 'lodash/fp/mapValues';
import keyBy from 'lodash/fp/keyBy';
import isEmpty from 'lodash/fp/isEmpty';
import flow from 'lodash/fp/flow';

const removeEmptyObjects = omitBy(o => isObject(o) && isEmpty(o));


/* eslint import/prefer-default-export: 0 */
export const filterToQuery = (filter) => {
  console.log('got filter', filter);
  // remove empty objects on filter

  if (_.isEmpty(filter)) {
    return {};
  }

  const query = removeEmptyObjects(filter);
  console.log('query is', query);
  return query;
};

const sortPropsToMongoSort = flow(
  keyBy('id'),
  mapValues(({ sortAscending }) => (sortAscending ? 1 : -1)),
);
const pagePropertiesToLimitAndSkip = ({ currentPage, pageSize } = { currentPage: 1, pageSize: 10 }) => ({
  limit: pageSize,
  skip: currentPage * pageSize,
});
export const gridOptionsToQueryOptions = ({ sortProperties, pageProperties }) => {
  console.log('got sortProperties', sortProperties);
  const sort = sortPropsToMongoSort(sortProperties);
  console.log('mongo sort', sort);
  const limitAndSkip = pagePropertiesToLimitAndSkip(pageProperties);
  return {
    sort,
    ...limitAndSkip,
  };
};
