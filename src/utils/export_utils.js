import flat from 'flat';

import {
  isObject,
  isDate,
  isEmpty,
  indexOf,
  omitBy,
  pickBy,
  flow,
  keys as lodashKeys,
  map
} from 'lodash/fp';

const getTransform = ({ fieldsToExport }) => {
  const isEmptyObject = field =>
    isObject(field) && !isDate(field) && isEmpty(field);
  const isFieldToExport = (val, key) => indexOf(key, fieldsToExport) >= 0;
  const removeEmptyObjects = doc => omitBy(isEmptyObject, doc);
  const pickFieldsToExport = doc =>
    fieldsToExport.length > 0 ? pickBy(isFieldToExport, doc) : doc;

  const transform = flow(
    map(flat),
    map(pickFieldsToExport),
    map(removeEmptyObjects)
  );

  return transform;
};
/* eslint import/prefer-default-export: 0*/
export const getExportSet = (allDocs, { fieldsToExport }) => {
  const transform = getTransform({ fieldsToExport });
  const data = transform(allDocs);

  const keysSet = new Set();
  data.forEach(entry => lodashKeys(entry).forEach(key => keysSet.add(key)));
  const keys = [...keysSet.values()];
  console.log(allDocs, fieldsToExport, keys);
  return { data, keys };
};
