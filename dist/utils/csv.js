'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _papaparse = require('papaparse');

var _papaparse2 = _interopRequireDefault(_papaparse);

var exportAsCsv = function exportAsCsv(_ref) {
  var filename = _ref.filename;
  var keys = _ref.keys;
  var columnTitles = _ref.columnTitles;
  var data = _ref.data;
  var _ref$parseOptions = _ref.parseOptions;
  var parseOptions = _ref$parseOptions === undefined ? { delimiter: ';' } : _ref$parseOptions;

  // we encode missing values with "NULL"
  // because CSV has no concept of null/missing values
  // good read: http://www.garretwilson.com/blog/2009/04/23/csvnull.xhtml
  var defaults = _lodash2['default'].zipObject(keys, keys.map(function () {
    return 'NULL';
  }));
  var columns = columnTitles || keys;
  var dataPadded = data.map(function (entry) {
    return _lodash2['default'].values(_extends({}, defaults, entry));
  });
  var csv = _papaparse2['default'].unparse({ fields: columns, data: dataPadded }, parseOptions);
  var blob = new window.Blob([csv]);
  var a = window.document.createElement('a');
  a.href = window.URL.createObjectURL(blob, { type: 'text/plain' });
  a.download = filename + '.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

exports['default'] = { exportAsCsv: exportAsCsv };
module.exports = exports['default'];
//# sourceMappingURL=csv.js.map