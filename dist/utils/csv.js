'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

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
delimiter: the delimiter for the csv
quotes: whether to add quotes around fields
any additional property will be passed to papaparse, see http://papaparse.com/docs#json-to-csv
**/
var exportAsCsv = function exportAsCsv(_ref) {
  var filename = _ref.filename;
  var keys = _ref.keys;
  var columnTitles = _ref.columnTitles;
  var data = _ref.data;
  var _ref$useBom = _ref.useBom;
  var useBom = _ref$useBom === undefined ? false : _ref$useBom;
  var _ref$delimiter = _ref.delimiter;
  var delimiter = _ref$delimiter === undefined ? ';' : _ref$delimiter;
  var _ref$quotes = _ref.quotes;
  var quotes = _ref$quotes === undefined ? true : _ref$quotes;
  var _ref$nullValue = _ref.nullValue;
  var nullValue = _ref$nullValue === undefined ? 'NULL' : _ref$nullValue;

  var additionalProps = _objectWithoutProperties(_ref, ['filename', 'keys', 'columnTitles', 'data', 'useBom', 'delimiter', 'quotes', 'nullValue']);

  // we encode missing values with "NULL"
  // because CSV has no concept of null/missing values
  // good read: http://www.garretwilson.com/blog/2009/04/23/csvnull.xhtml
  var defaults = _lodash2['default'].zipObject(keys, keys.map(function () {
    return nullValue;
  }));
  var columns = columnTitles || keys;
  var dataPadded = data.map(function (entry) {
    return _lodash2['default'].values(_extends({}, defaults, entry));
  });
  var papaOptions = _extends({ delimiter: delimiter, quotes: quotes }, additionalProps);
  var csv = _papaparse2['default'].unparse({ fields: columns, data: dataPadded }, papaOptions);
  (0, _fileSaver.saveAs)(new window.Blob([csv], { type: 'text/plain;charset=utf-8' }), filename + '.csv', useBom);
};

exports['default'] = { exportAsCsv: exportAsCsv };
module.exports = exports['default'];
//# sourceMappingURL=csv.js.map