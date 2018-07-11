import { composeAll } from '@storybook/react-komposer';
import { get } from 'lodash/fp';
import { withHandlers } from 'recompose';

import composeWithTracker from '../utils/composeWithTracker';
/**
 * this does a "soft" aggregation on the client
 */
export const composer = () => (props, onData) => {
  const { aggregationName, aggregations } = props;
  const aggregation = get(aggregationName)(aggregations);
  if (!aggregation) {
    onData(new Error(`unkown aggregation:${aggregationName}`));
  } else {
    const { aggregate, aggregateComposer, ...aggregationProps } = aggregation;
    const allAggregationProps = {
      ...aggregationProps,
      griddleLocal: true,
      isAggregation: true
    };
    if (aggregateComposer) {
      aggregateComposer(props, (e, p) =>
        onData(e, { ...allAggregationProps, ...p })
      );
    } else if (aggregate) {
      const docsAggregated = aggregate(props.docs, props);
      onData(null, {
        docs: docsAggregated,
        ...allAggregationProps
      });
    } else {
      onData(new Error('specify either aggregate or aggregateComposer'));
    }
  }
};

export default type =>
  composeAll(
    withHandlers({
      // overwrite
      exportCurrentSearchAsCsv: ({ docs, exportCsvFromLocalDocs }) => (
        ...exportArgs
      ) => {
        exportCsvFromLocalDocs(docs, ...exportArgs);
      }
    }),
    composeWithTracker(composer(type))
  );
