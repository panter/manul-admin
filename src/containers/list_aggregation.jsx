import React from 'react';
import { composeAll } from 'mantra-core';
import withCollectionProps from '../hocs/with_collection_props';
import withListDocuments from '../hocs/with_list_documents';
import withAggregation from '../hocs/with_aggregation';
import withDeps from '../hocs/with_deps';

export default composeAll(
  withAggregation(),
  withListDocuments(),
  withCollectionProps('listAggregation'),
  withDeps(),
)(({ Component, ...props }) =>
  <Component {...props} />,
);
