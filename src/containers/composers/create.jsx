import React from 'react';
import { composeAll } from 'mantra-core';
import withCollectionProps from '../../hocs/with_collection_props';
import withDeps from '../../hocs/with_deps';
import Create from '../create';

export default composeAll(
  withCollectionProps(),
  withDeps(),
)(props =>
  <Create {...props} />,
);
