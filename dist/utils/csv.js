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

var _fileSaver = require('file-saver');

/**
create a csv-file in the browser from the given data

data: Array of documents
keys: all keys of every document that should be included
filename: the filename of the resulting csv-file
columnTitles: the column titles on the first row
useBom: whether to include a UTF-16 byte order mark
parseOptions: options for papaparse
**/
var exportAsCsv = function exportAsCsv(_ref) {
  var filename = _ref.filename;
  var keys = _ref.keys;
  var columnTitles = _ref.columnTitles;
  var data = _ref.data;
  var _ref$useBom = _ref.useBom;
  var useBom = _ref$useBom === undefined ? false : _ref$useBom;
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
  (0, _fileSaver.saveAs)(new window.Blob([csv], { type: 'text/plain;charset=utf-8' }), filename + '.csv', useBom);
};

exports['default'] = { exportAsCsv: exportAsCsv };
module.exports = exports['default'];
//# sourceMappingURL=csv.js.map