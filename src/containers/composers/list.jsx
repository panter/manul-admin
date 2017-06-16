import React from 'react';
import { composeAll } from 'mantra-core';
import withCollectionProps from '../../hocs/with_collection_props';
import withListDocuments from '../../hocs/with_list_documents';
import withDeps from '../../hocs/with_deps';
import List from '../list';

export default composeAll(
  withListDocuments(),
  withCollectionProps(),
  withDeps(),
)(props =>
  <List {...props} />,
);
