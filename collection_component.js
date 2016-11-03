
import _ from 'lodash';
import React from 'react';

import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';
import withCollectionProps from './hocs/with_collection_props';

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  withCollectionProps(),
  useDeps(depsMapper)
)((props) => {
  let BaseComponent;
  const { collectionName, components, type } = props;
  if (_.isFunction(components[type])) {
    BaseComponent = components[type];
  } else if (_.has(components, [type, collectionName])) {
    BaseComponent = components[type][collectionName];
  } else {
    BaseComponent = components[type].default;
  }
  const Component = () => <BaseComponent {...props} />;
  Component.displayName = `Admin_${collectionName}_${type}`;
  return Component;
});
