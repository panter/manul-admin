import _ from 'lodash';
import Papa from 'papaparse';


/**
create a csv-file in the browser from the given data

data: Array of documents
keys: all keys of every document that should be included
filename: the filename of the resulting csv-file
columnTitles: the column titles on the first row
useBom: whether to include a UTF-16 byte order mark
parseOptions: options for papaparse
**/
const exportAsCsv = ({ filename, keys, columnTitles, data, useBom = false, parseOptions = { delimiter: ';' } }) => {
  // we encode missing values with "NULL"
  // because CSV has no concept of null/missing values
  // good read: http://www.garretwilson.com/blog/2009/04/23/csvnull.xhtml
  const defaults = _.zipObject(keys, keys.map(() => 'NULL'));
  const columns = columnTitles || keys;
  const dataPadded = data.map(entry => (_.values({ ...defaults, ...entry })));

  const csv = Papa.unparse({ fields: columns, data: dataPadded }, parseOptions);

  const blob = useBom ?
    new window.Blob([Buffer.concat([new Buffer('\ufeff'), new Buffer(csv)])]) :
    new window.Blob([csv]);
  const a = window.document.createElement('a');
  a.href = window.URL.createObjectURL(blob, { type: 'text/plain' });
  a.download = `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export default { exportAsCsv };
