import _ from 'lodash';
import Papa from 'papaparse';
import { T } from '/manul-i18n';

const exportAsCsv = ({ filename, keys, columnTitles, data, parseOptions = { delimiter: ';' } }) => {
  // we encode missing values with "NULL"
  // because CSV has no concept of null/missing values
  // good read: http://www.garretwilson.com/blog/2009/04/23/csvnull.xhtml
  const defaults = _.zipObject(keys, keys.map(() => 'NULL'));
  const columns = columnTitles || keys;
  const dataPadded = data.map(entry => (_.values({ ...defaults, ...entry })));
  const csv = Papa.unparse({ fields: columns, data: dataPadded }, parseOptions);
  const blob = new Blob([csv]);
  const a = window.document.createElement('a');
  a.href = window.URL.createObjectURL(blob, { type: 'text/plain' });
  a.download = `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export default { exportAsCsv };
