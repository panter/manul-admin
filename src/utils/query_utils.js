// @flow

import {
  omitBy,
  map,
  isObject,
  mapValues,
  keyBy,
  isEmpty,
  flow,
  trim,
  isFunction,
  isUndefined
} from 'lodash/fp';

import type {
  SortPropertiesT,
  PagePropertiesT,
  CreateQueryArgsT,
  SearchTermT
} from '../types';

const removeEmptyObjects = selector =>
  omitBy(o => isUndefined(o) || (isObject(o) && isEmpty(o)))(selector);

const queryListFromTerm = (term: SearchTermT) =>
  flow(
    map(field => ({
      [field]: {
        $regex: term,
        $options: 'i'
      }
    }))
  );
// using case-insensitive regex makes it slow, so we do a little hack
const queryForTerm = term => searchFields => ({
  $or: queryListFromTerm(term)(
    isFunction(searchFields) ? searchFields(term) : searchFields
  )
});
const termToTermList = term => (term ? term.split(' ').map(trim) : []);

const createFieldSearchQuery = (searchFields, terms, useTextIndex) =>
  /*
  two strategies: text search (if availble) or regex search
  - in text search, if multiple terms are separated with space, every one should occure
  */
  ({
    $or: [
      // text search
      ...(useTextIndex
        ? [
            {
              $text: {
                // quote terms, so that its an AND search
                // see https://stackoverflow.com/a/16906099/1463534
                $search: terms.map(t => `"${t}"`).join(' ')
              }
            }
          ]
        : []),
      // regex search
      // every
      ...(searchFields
        ? [
            {
              $and: map(term => queryForTerm(term)(searchFields))(terms)
            }
          ]
        : [])
    ]
  });
/* eslint import/prefer-default-export: 0 */
export const createQuery = ({
  filter,
  searchTerm,
  searchFields,
  filterToBaseQuery = f => f,
  useTextIndex
}: CreateQueryArgsT) => ({
  ...(!isEmpty(filter) ? removeEmptyObjects(filterToBaseQuery(filter)) : {}),
  ...(!isEmpty(searchTerm) &&
  (isFunction(searchFields) || !isEmpty(searchFields))
    ? createFieldSearchQuery(
        searchFields,
        termToTermList(searchTerm),
        useTextIndex
      )
    : {})
});

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

export const createQueryOptions = ({
  sortProperties,
  pageProperties = null
}: {
  sortProperties: SortPropertiesT,
  pageProperties: PagePropertiesT
}) => {
  const sort = sortPropsToMongoSort(sortProperties);

  const limitAndSkip = pageProperties
    ? pagePropertiesToLimitAndSkip(pageProperties)
    : null;
  return {
    sort,
    ...limitAndSkip
  };
};
