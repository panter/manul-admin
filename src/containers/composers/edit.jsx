import React from 'react';
import { composeAll } from 'mantra-core';
import withCollectionProps from '../../hocs/with_collection_props';
import withEditDocument from '../../hocs/with_edit_document';
import withDeps from '../../hocs/with_deps';
import Edit from '../edit';

export default composeAll(
  withEditDocument(),
  withCollectionProps(),
  withDeps(),
)(props =>
  <Edit {...props} />,
);
