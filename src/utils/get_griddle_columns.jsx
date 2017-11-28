import { ColumnDefinition } from 'griddle-react';
import React from 'react';
import { isString } from 'lodash/fp';
import { T } from '@panter/manul-i18n';
import styled from 'styled-components';
import enhanceWithRowData from '../hocs/enhance_with_row_data';
import {
  GriddleActionButton,
  GriddleActionIconLinkButton,
} from './griddle_action_button';

const PencilIcon = require('react-icons/lib/go/pencil');

const CustomHeadingBase = styled.span`
  white-space: nowrap;
  margin-right: 10px;
`;

const ActionCell = styled.p`
  display: flex;
  align-items: center;
  margin-bottom: 0;
`;


const ColumnDef = ({ title, icon }) => (
  <T _id={title}>
    {(text) => {
      const label = text || title;
      return (
        <CustomHeadingBase>
          <span>{label}</span>
          {icon && (<span>{icon}</span>)}
        </CustomHeadingBase>
      );
    }}
  </T>
);

const getActionsColumn = ({ RowActions = [], ...props }) => (
  <ColumnDefinition
    id="_actions"
    title=" "
    key="_actions"
    order={-1}
    customComponent={enhanceWithRowData(({ rowData }) => (
      <ActionCell>
        {RowActions.map(
          (Action, index) => <Action key={index} rowData={rowData} {...props} />,
        )}
      </ActionCell>
    ))}
  />
);

const getColumns = ({ collectionName, columns, columnsI18n = `${collectionName}` }) => {
  const getTitle = id => `${columnsI18n}.${id}`;
  return columns.map(
    (props, index) => {
      if (isString(props)) {
        return (
          <ColumnDefinition
            order={index + 1}
            key={props}
            customHeadingComponent={ColumnDef}
            title={getTitle(props)}
            id={props}
          />
        );
      }
      return (
        <ColumnDefinition
          title={getTitle(props.id)}
          key={props.id}
          {...props}
          customHeadingComponent={ColumnDef}
          order={index + 1}
        />);
    },
  );
};

const EditAction = ({ collectionName, rowData: { _id } }) => (
  <GriddleActionIconLinkButton
    noMinWidth
    noMinHeight
    routeName={`admin.${collectionName}.edit`}
    params={{ _id }}
    icon={PencilIcon}
  />
);

const SelectAction = ({ onSelect, rowData: { _id } }) => (
  <GriddleActionButton
    onClick={() => onSelect(_id)}
  >
    Select
  </GriddleActionButton>
);
const getDefaultActions = ({ hideDefaultRowActions, isAggregation, isLookup }) => {
  if (hideDefaultRowActions) {
    return [];
  }
  if (isLookup) {
    return [SelectAction];
  }
  if (!isAggregation) {
    return [EditAction];
  }
  return [];
};

export default ({ RowActions = [], ...props }) => {
  const columnDefs = getColumns(props);
  const DefaultActions = getDefaultActions(props);
  const actionColumn = getActionsColumn({
    RowActions: [...DefaultActions, ...RowActions], ...props,
  });
  return [actionColumn, ...columnDefs];
};

