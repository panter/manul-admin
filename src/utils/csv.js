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
delimiter: the delimiter for the csv
quotes: whether to add quotes around fields
any additional property will be passed to papaparse, see http://papaparse.com/docs#json-to-csv
**/
const exportAsCsv = ({
  filename,
  keys,
  columnTitles,
  data,
  useBom = false,
  delimiter = ';',
  quotes = true,
  nullValue = 'NULL',
  ...additionalProps
 }) => {
  // we encode missing values with "NULL"
  // because CSV has no concept of null/missing values
  // good read: http://www.garretwilson.com/blog/2009/04/23/csvnull.xhtml
  const defaults = _.zipObject(keys, keys.map(() => nullValue));
  const columns = columnTitles || keys;
  const dataPadded = data.map(entry => (_.values({ ...defaults, ...entry })));
  const papaOptions = { delimiter, quotes, ...additionalProps };
  const csv = Papa.unparse({ fields: columns, data: dataPadded }, papaOptions);
  saveAs(new window.Blob([csv], { type: 'text/plain;charset=utf-8' }), `${filename}.csv`, useBom);
};

export default { exportAsCsv };
