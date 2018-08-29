// @flow
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import mapValues from 'lodash/mapValues';
import mapKeys from 'lodash/mapKeys';
import keyBy from 'lodash/keyBy';
import findLastIndex from 'lodash/findLastIndex';
import type {
  ColumnsT,
  ListTypeT,
  MethodsContextT,
  CollectionConfigT,
  ListOptionsT
} from '../../types';
import mongoAggregation from '../../utils/mongoAggregation';
import { createQuery, createQueryOptions } from '../../utils/query_utils';
import { formatDocs } from '../../utils/column_utils';

const DEBUG = false;

const DEFAULT_AGGREGATE_OPTIONS = {
  cursor: {}, // return a cursor.
  readPreference: 'secondaryPreferred' // read from secondary in a replica set
};
const logObject = obj => {
  function replacer(key, value) {
    if (value instanceof RegExp) return `__REGEXP ${value.toString()}`;
    return value;
  }
  console.log(JSON.stringify(obj, replacer, 2));
};

const COUNT_PRESERVING_STAGES = ['$addFields', '$project', '$lookup', '$sort'];
/**
 * intelligently add the $count stage after the last stage that influences the count
 * if no such stage is given, add only the $count stage
 * @param {Array} stages
 */
const addCount = stages => {
  const lastCountChangingStage = findLastIndex(stages, stage =>
    Object.keys(stage).find(key => !COUNT_PRESERVING_STAGES.includes(key))
  );
  return [...stages.slice(0, lastCountChangingStage + 1), { $count: 'count' }];
};

/* sort and project by array index (field.<index>.subfield) is not supported as it seems, but it works, when we remove the .<index>. */
const removeArrayIndex = columnId =>
  columnId && columnId.replace(/\.[0-9]+\./, '.');
const cleanArrayIndexInSort = sort =>
  mapKeys(sort, (value, key) => removeArrayIndex(key));
const extractColumnsToUse = (columns: ColumnsT, type: ListTypeT = 'ui') =>
  columns
    .map(column => {
      if (typeof column === 'string') {
        return column;
      }
      if (!column.include || column.include[type]) {
        return column.id;
      }
      return null;
    })
    .filter(c => !isEmpty(c))
    .map(removeArrayIndex);

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
    return [
      ...basePipeline,
      ...(aggregationOptions && aggregationOptions.stages
        ? addCount([
            ...(aggregationOptions.stagesPreSort || []),
            ...aggregationOptions.stages
          ])
        : [{ $count: 'count' }])
    ];
  }
  const sortPipeline = [
    ...(!isEmpty(queryOptions.sort)
      ? [{ $sort: cleanArrayIndexInSort(queryOptions.sort) }]
      : []),
    ...(queryOptions.limit
      ? [{ $limit: queryOptions.limit + (queryOptions.skip || 0) }]
      : []),
    { $skip: queryOptions.skip || 0 }
  ];
  const filterColumnsStage = {
    $project: mapValues(
      keyBy(
        extractColumnsToUse(collectionConfig.columns, listOptions.listType)
      ),
      () => true
    )
  };
  return [
    ...basePipeline,
    ...(aggregationOptions && aggregationOptions.stagesPreSort
      ? aggregationOptions.stagesPreSort
      : []),
    ...(aggregationOptions && !aggregationOptions.postSort ? sortPipeline : []),
    ...(aggregationOptions ? aggregationOptions.stages : []),
    ...(!aggregationOptions || aggregationOptions.postSort ? sortPipeline : []),
    filterColumnsStage
  ];
};

const getDocumentsAsArray = async (context, collectionConfig, listOptions) => {
  const pipeline = getPipeline({
    context,
    collectionConfig,
    listOptions
  });
  if (DEBUG) logObject(pipeline);
  const docsCursor = await mongoAggregation(
    collectionConfig.collection,
    pipeline,
    DEFAULT_AGGREGATE_OPTIONS
  );

  if (DEBUG) {
    console.log('EXPLAIN:');
    logObject(
      await (await mongoAggregation(collectionConfig.collection, pipeline, {
        ...DEFAULT_AGGREGATE_OPTIONS,
        explain: true
      })).toArray()
    );
  }

  const docsFormatted = formatDocs(
    docsCursor,
    collectionConfig,
    listOptions.listType
  );
  return await docsFormatted.toArray();
};

const getTheCount = async (context, collectionConfig, listOptions) => {
  const countCursor = await mongoAggregation(
    collectionConfig.collection,
    getPipeline({
      context,
      collectionConfig,
      listOptions,

      countOnly: true
    }),
    DEFAULT_AGGREGATE_OPTIONS
  );

  const result = await countCursor.toArray();
  return result[0] ? result[0].count : 0;
};

/* eslint import/prefer-default-export: 0 */
export default async ({
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
  if (DEBUG) console.log('listOptions', listOptions);
  if (DEBUG) console.time('docs aggregation');

  const docs = getDocuments
    ? await getDocumentsAsArray(context, collectionConfig, listOptions)
    : [];

  if (DEBUG) console.timeEnd('docs aggregation');
  if (DEBUG) console.log('num docs', docs && docs.length);

  if (DEBUG) console.time('countAggregation');
  let count = 0;

  if (getCount) {
    const { pageProperties } = listOptions;
    if (docs && pageProperties && docs.length < pageProperties.pageSize) {
      count =
        docs.length +
        (pageProperties.currentPage - 1) * pageProperties.pageSize;
    } else {
      count = await getTheCount(context, collectionConfig, listOptions);
    }
  }

  if (DEBUG) console.timeEnd('countAggregation');
  if (DEBUG) console.log('countAggregation result: ', count);

  return {
    docs,
    count
  };
};
