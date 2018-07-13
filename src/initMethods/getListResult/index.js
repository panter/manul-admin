// @flow
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import type {
  MethodsContextT,
  CollectionConfigT,
  ListOptionsT
} from '../../types';
import mongoAggregation from '../../utils/mongoAggregation';
import { createQuery, createQueryOptions } from '../../utils/query_utils';

const DEBUG = true;

const logObject = obj => {
  function replacer(key, value) {
    if (value instanceof RegExp) return `__REGEXP ${value.toString()}`;
    return value;
  }
  console.log(JSON.stringify(obj, replacer, 2));
};

const getPipeline = ({
  context,
  collectionConfig,
  listOptions,
  countOnly = false
}: {
  context: MethodsContextT,
  collectionConfig: CollectionConfigT,
  listOptions: ListOptionsT,
  countOnly?: boolean
}) => {
  const { Meteor } = context;
  const { filter, searchTerm, sortProperties, pageProperties } = listOptions;
  const {
    searchFields,
    filterToBaseQuery,
    textIndex,
    aggregation
  } = collectionConfig;
  const useTextIndex = Meteor.isServer && Boolean(textIndex);
  const baseQuery = createQuery({
    filter,
    searchFields,
    searchTerm,
    filterToBaseQuery,
    useTextIndex
  });

  const queryOptions = createQueryOptions({
    sortProperties,
    pageProperties
  });
  if (DEBUG) logObject({ searchTerm, baseQuery, queryOptions });
  /* eslint no-nested-ternary: 0*/

  const aggregationOptions =
    aggregation && isFunction(aggregation)
      ? aggregation({
          searchTerm,
          filter,
          collectionConfig,
          listOptions,
          countOnly
        })
      : aggregation;

  const basePipeline = [{ $match: baseQuery }];

  if (countOnly) {
    return [...basePipeline, { $count: 'count' }];
  }
  const sortPipeline = [
    ...(!isEmpty(queryOptions.sort) ? [{ $sort: queryOptions.sort }] : []),
    ...(queryOptions.limit
      ? [{ $limit: queryOptions.limit + (queryOptions.skip || 0) }]
      : []),
    { $skip: queryOptions.skip || 0 }
  ];

  return [
    ...basePipeline,
    ...(aggregationOptions && !aggregationOptions.postSort ? sortPipeline : []),
    ...(aggregationOptions ? aggregationOptions.stages : []),
    ...(!aggregationOptions || aggregationOptions.postSort ? sortPipeline : [])
  ];
};

/* eslint import/prefer-default-export: 0 */
export default ({
  context,
  collectionConfig,
  listOptions,
  getCount = true,
  getDocuments = true
}: {
  context: MethodsContextT,

  collectionConfig: CollectionConfigT,
  listOptions: ListOptionsT,
  getCount?: boolean,
  getDocuments?: boolean
}) => {
  if (DEBUG) console.time('docs aggregation');
  const pipeline = getPipeline({
    context,
    collectionConfig,
    listOptions
  });
  if (DEBUG) logObject(pipeline);

  const docsAggregation = getDocuments
    ? mongoAggregation(context, collectionConfig.collection, pipeline)
    : undefined;
  if (DEBUG) console.timeEnd('docs aggregation');
  /*
  if (DEBUG) console.time('docs');
  const docs = getDocuments
    ? collectionConfig.collection.find(query, queryOptions).fetch()
    : undefined;
  if (DEBUG) console.timeEnd('docs');
  

  if (DEBUG) console.time('count');
  const count = getCount
    ? collectionConfig.collection.find(query).count()
    : undefined;
  if (DEBUG) console.timeEnd('count');

    */
  if (DEBUG) console.time('countAggregation');
  const [{ count } = {}] = getCount
    ? mongoAggregation(
        context,
        collectionConfig.collection,
        getPipeline({
          context,
          collectionConfig,
          listOptions,
          countOnly: true
        })
      )
    : [{ count: 0 }];
  if (DEBUG) console.timeEnd('countAggregation');
  console.log('countAggregation', count);
  return { docs: docsAggregation, count };
};
