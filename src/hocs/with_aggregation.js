
import composeWithTracker from '../utils/composeWithTracker';

import { get } from 'lodash/fp';

export const composer = () => (
  props, onData,
) => {
  const { aggregationName, aggregations } = props;
  const aggregation = get(aggregationName)(aggregations);
  if (!aggregation) {
    onData(new Error(`unkown aggregation:${aggregationName}`));
  } else {
    const { aggregate, aggregateComposer, ...aggregationProps } = aggregation;
    const allAggregationProps = {
      ...aggregationProps,
      isAggregation: true,
    };
    if (aggregateComposer) {
      aggregateComposer(props, (e, p) => onData(e, { ...allAggregationProps, ...p }));
    } else if (aggregate) {
      const docsAggregated = aggregate(props.docs, props);
      onData(null, {
        docs: docsAggregated,
        ...allAggregationProps,
      });
    } else {
      onData(new Error('specify either aggregate or aggregateComposer'));
    }
  }
};


export default type => composeWithTracker(composer(type));
