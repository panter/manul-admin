
import React from 'react';


import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';
import withCollectionProps from './hocs/with_collection_props';

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  withCollectionProps(),
  useDeps(depsMapper)
)(({ Component, ...props }) =>
  <Component {...props} />
);
