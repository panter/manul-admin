import React from 'react';
import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';
import withCollectionProps from '../hocs/with_collection_props';
import withDeps from '../hocs/with_deps';

export default composeAll(
  withCollectionProps('create'),
  withDeps()
)(({ Component, ...props }) =>
  <Component {...props} />
);
