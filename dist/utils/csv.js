'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _papaparse = require('papaparse');

var _papaparse2 = _interopRequireDefault(_papaparse);

var _fileSaver = require('file-saver');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var exportAsCsv = function exportAsCsv(_ref) {
  var filename = _ref.filename,
      keys = _ref.keys,
      columnTitles = _ref.columnTitles,
      data = _ref.data,
      _ref$transforms = _ref.transforms,
      transforms = _ref$transforms === undefined ? null : _ref$transforms,
      _ref$useBom = _ref.useBom,
      useBom = _ref$useBom === undefined ? false : _ref$useBom,
      _ref$delimiter = _ref.delimiter,
      delimiter = _ref$delimiter === undefined ? ';' : _ref$delimiter,
      _ref$quotes = _ref.quotes,
      quotes = _ref$quotes === undefined ? true : _ref$quotes,
      _ref$nullValue = _ref.nullValue,
      defaultNullValue = _ref$nullValue === undefined ? '' : _ref$nullValue,
      _ref$nullValues = _ref.nullValues,
      nullValues = _ref$nullValues === undefined ? [] : _ref$nullValues,
      additionalProps = (0, _objectWithoutProperties3.default)(_ref, ['filename', 'keys', 'columnTitles', 'data', 'transforms', 'useBom', 'delimiter', 'quotes', 'nullValue', 'nullValues']);

  // we encode missing values with "NULL"
  // because CSV has no concept of null/missing values
  // good read: http://www.garretwilson.com/blog/2009/04/23/csvnull.xhtml

  var columns = columnTitles || keys;

  var dataPadded = data.map(function (entry) {
    return keys.map(function (key, index) {
      var valueOrDefault = (0, _get2.default)(entry, key, (0, _get2.default)(nullValues, key, nullValues[index] || defaultNullValue));

      /* eslint no-nested-ternary: 0*/
      var transform = transforms ? (0, _get2.default)(transforms, key, transforms[index]) : null;
      return transform ? transform(valueOrDefault) : valueOrDefault;
    });
  });
  var papaOptions = (0, _extends3.default)({ delimiter: delimiter, quotes: quotes }, additionalProps);
  var csv = _papaparse2.default.unparse({ fields: columns, data: dataPadded }, papaOptions);
  (0, _fileSaver.saveAs)(new window.Blob([csv], { type: 'text/plain;charset=utf-8' }), filename + '.csv', !useBom);
};

exports.default = { exportAsCsv: exportAsCsv };
//# sourceMappingURL=csv.js.map