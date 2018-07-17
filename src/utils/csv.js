import get from 'lodash/get';
import isObject from 'lodash/isObject';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

/**
create a csv-file in the browser from the given data

data: Array of documents
keys: all keys of every document that should be included
filename: the filename of the resulting csv-file
columnTitles: the column titles on the first row, need to be in the same order as keys
useBom: whether to include a UTF-16 byte order mark
delimiter: the delimiter for the csv
quotes: whether to add quotes around fields
any additional property will be passed to papaparse, see http://papaparse.com/docs#json-to-csv
**/
const exportAsCsv = ({
  filename,
  keys,
  columnTitles,
  data,
  transforms = null,
  useBom = false,
  delimiter = ';',
  quotes = true,
  nullValue: defaultNullValue = '', // deprecated
  nullValues = [], // can also be object
  ...additionalProps
}) => {
  // we encode missing values with "NULL"
  // because CSV has no concept of null/missing values
  // good read: http://www.garretwilson.com/blog/2009/04/23/csvnull.xhtml

  const columns = columnTitles || keys;
  const dataPadded = data.map(entry =>
    keys.map((key, index) => {
      const valueOrDefault = get(
        entry,
        key,
        isObject(nullValues)
          ? get(nullValues, key, defaultNullValue)
          : nullValues[index] || defaultNullValue
      );
      /* eslint no-nested-ternary: 0*/
      const transform = transforms
        ? isObject(transforms)
          ? get(transforms, key)
          : transforms[index]
        : null;
      return transform ? transform(valueOrDefault) : valueOrDefault;
    })
  );
  const papaOptions = { delimiter, quotes, ...additionalProps };
  const csv = Papa.unparse({ fields: columns, data: dataPadded }, papaOptions);
  saveAs(
    new window.Blob([csv], { type: 'text/plain;charset=utf-8' }),
    `${filename}.csv`,
    !useBom
  );
};

export default { exportAsCsv };
