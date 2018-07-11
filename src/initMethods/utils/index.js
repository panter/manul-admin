// @flow

import type {
  MethodsContextT,
  CollectionNameT,
  CollectionConfigT,
  ListArgumentsT
} from '../../types';

import {
  filterToQuery,
  gridOptionsToQueryOptions
} from '../../utils/query_utils';

const DEBUG = true;

const logObject = obj => {
  function replacer(key, value) {
    if (value instanceof RegExp) return `__REGEXP ${value.toString()}`;
    return value;
  }
  console.log(JSON.stringify(obj, replacer, 2));
};

/* eslint import/prefer-default-export: 0*/
export const getListQueryAndOptions = (
  context: MethodsContextT,
  collectionName: CollectionNameT,
  collectionConfig: CollectionConfigT,
  listArguments: ListArgumentsT
) => {
  const { Meteor } = context;
  const { filter, searchTerm, sortProperties, pageProperties } = listArguments;
  const { searchFields, transformFilter, textIndex } = collectionConfig;
  const hasTextIndex = Meteor.isServer && Boolean(textIndex);
  const query = filterToQuery(
    filter,
    searchTerm && { searchFields, searchTerm },
    transformFilter,
    hasTextIndex
  );

  const queryOptions = gridOptionsToQueryOptions({
    sortProperties,
    pageProperties
  });
  if (DEBUG) logObject({ searchTerm, query, queryOptions });

  return {
    query,
    queryOptions
  };
};
