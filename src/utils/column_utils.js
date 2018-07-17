// @flow
import isFunction from 'lodash/isFunction';
import mapValues from 'lodash/mapValues';
import isObject from 'lodash/isObject';
import type { ListTypeT, ColumnDefT, CollectionConfigT } from '../types';

/* eslint import/prefer-default-export: 0*/
export const filterColumns = (columns: Array<ColumnDefT>, type: ListTypeT) =>
  columns.filter(
    column =>
      typeof column === 'string' || !column.include || column.include[type]
  );

export const getColumnTitleI18nKey = ({
  collectionName,
  collectionConfig,
  column
}: {
  collectionName: string,
  collectionConfig: CollectionConfigT,
  column: ColumnDefT
}) =>
  typeof column !== 'string' && column.title
    ? column.title
    : `${collectionConfig.columnsI18n || collectionName}.${
        typeof column === 'string' ? column : column.id
      }`;

export const formatDocs = (
  docs: Array<*>,
  config: CollectionConfigT,
  listType: ListTypeT
): Array<*> => {
  const formats = config.columns.reduce((acc, column) => {
    if (typeof column !== 'string' && column.format) {
      if (isFunction(column.format)) {
        return {
          ...acc,
          [column.id]: column.format
        };
      } else if (column.format[listType]) {
        return {
          ...acc,
          [column.id]: column.format[listType]
        };
      }
    }
    return acc;
  }, {});
  const formatObj = (obj, parentKey = null) =>
    mapValues(obj, (value, key) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      if (formats[fullKey]) {
        return formats[fullKey]({ value, key: fullKey });
      } else if (isObject(value)) {
        return formatObj(value, fullKey);
      }
      return value;
    });

  return docs.map((doc: {}) => formatObj(doc));
};
