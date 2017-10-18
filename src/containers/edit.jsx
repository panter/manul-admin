import React from 'react';
import { composeAll } from 'manul-mantra-core';
import withCollectionProps from '../hocs/with_collection_props';
import withEditDocument from '../hocs/with_edit_document';
import withDeps from '../hocs/with_deps';

export default composeAll(
  withEditDocument(),
  withCollectionProps('edit'),
  withDeps(),
)(({ Component, ...props }) =>
  <Component {...props} />,
);
