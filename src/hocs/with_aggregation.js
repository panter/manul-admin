
import { composeWithTracker } from 'mantra-core';

import { get } from 'lodash/fp';

export const composer = () => (
  { context, config, collectionName, aggregationName, docs, aggregations }, onData,
) => {
  const aggregation = get(aggregationName)(aggregations);
  if (!aggregation) {
    onData(new Error(`unkown aggregation:${aggregationName}`));
  } else {
    const { aggregate, columns = [] } = aggregation;
    const docsAggregated = aggregate(docs);
    onData(null, {
      docs: docsAggregated,
      columns,
      isAggregation: true,
    });
  }
};


export default type => composeWithTracker(composer(type));
