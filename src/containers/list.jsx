import React from 'react';
import { composeAll } from '@storybook/mantra-core';
import withCollectionProps from '../hocs/with_collection_props';
import withListDocuments from '../hocs/with_list_documents';
import withDeps from '../hocs/with_deps';

export default composeAll(
  withListDocuments(),
  withCollectionProps('list'),
  withDeps(),
)(({ Component, ...props }) =>
  <Component {...props} />,
);
