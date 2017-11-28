import React from 'react';
import styled from 'styled-components';
import i18n, { T } from '@panter/manul-i18n';
import LinkButton from '../containers/link_button';
import CollectionFilter from './collection_filter';

const ActionButton = styled(LinkButton) `
  margin-left: 5px;
`;

const CollectionActions = ({ collectionName, className, onFilterChange }) => (
  <div className={className}>
    <div style={{ flex: 1 }}>
      <CollectionFilter onFilterChange={onFilterChange} />
    </div>
    <div>
      <T _id={[`admin.${collectionName}.create`, 'admin.create']}>{text => (
        <ActionButton routeName={`admin.${collectionName}.create`} color="primary">
          {text}
        </ActionButton>
      )}</T>
    </div>
  </div>
);

export default styled(CollectionActions) `
  margin: 15px 0;
  text-align: right;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
`;
