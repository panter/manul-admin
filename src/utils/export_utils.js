import flat from 'flat';

import {
  isObject,
  isDate,
  isEmpty,
  omitBy,
  flow,
  keys as lodashKeys,
  map
} from 'lodash/fp';

const getTransform = () => {
  const isEmptyObject = field =>
    isObject(field) && !isDate(field) && isEmpty(field);

  const removeEmptyObjects = doc => omitBy(isEmptyObject, doc);

  const transform = flow(
    map(flat),
    map(removeEmptyObjects)
  );

  return transform;
};
/* eslint import/prefer-default-export: 0*/
export const getExportSet = allDocs => {
  const transform = getTransform();
  const data = transform(allDocs);

  const keysSet = new Set();
  data.forEach(entry => lodashKeys(entry).forEach(key => keysSet.add(key)));
  const keys = [...keysSet.values()];

  return { data, keys };
};
