import _ from 'lodash';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

/**
create a csv-file in the browser from the given data

data: Array of documents
keys: all keys of every document that should be included
filename: the filename of the resulting csv-file
columnTitles: the column titles on the first row
useBom: whether to include a UTF-16 byte order mark
parseOptions: options for papaparse
**/
const exportAsCsv = ({ filename, keys, columnTitles, data, useBom = false, parseOptions = { delimiter: ';' }, nullValue = 'NULL' }) => {
  // we encode missing values with "NULL"
  // because CSV has no concept of null/missing values
  // good read: http://www.garretwilson.com/blog/2009/04/23/csvnull.xhtml
  const defaults = _.zipObject(keys, keys.map(() => nullValue));
  const columns = columnTitles || keys;
  const dataPadded = data.map(entry => (_.values({ ...defaults, ...entry })));

  const csv = Papa.unparse({ fields: columns, data: dataPadded }, parseOptions);
  saveAs(new window.Blob([csv], { type: 'text/plain;charset=utf-8' }), `${filename}.csv`, useBom);
};

export default { exportAsCsv };
