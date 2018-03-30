'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExportSet = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _map2 = require('lodash/fp/map');

var _map3 = _interopRequireDefault(_map2);

var _keys2 = require('lodash/fp/keys');

var _keys3 = _interopRequireDefault(_keys2);

var _flow2 = require('lodash/fp/flow');

var _flow3 = _interopRequireDefault(_flow2);

var _pickBy2 = require('lodash/fp/pickBy');

var _pickBy3 = _interopRequireDefault(_pickBy2);

var _omitBy2 = require('lodash/fp/omitBy');

var _omitBy3 = _interopRequireDefault(_omitBy2);

var _indexOf2 = require('lodash/fp/indexOf');

var _indexOf3 = _interopRequireDefault(_indexOf2);

var _isEmpty2 = require('lodash/fp/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _isDate2 = require('lodash/fp/isDate');

var _isDate3 = _interopRequireDefault(_isDate2);

var _isObject2 = require('lodash/fp/isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _flat = require('flat');

var _flat2 = _interopRequireDefault(_flat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTransform = function getTransform(_ref) {
  var fieldsToExport = _ref.fieldsToExport;

  var isEmptyObject = function isEmptyObject(field) {
    return (0, _isObject3.default)(field) && !(0, _isDate3.default)(field) && (0, _isEmpty3.default)(field);
  };
  var isFieldToExport = function isFieldToExport(val, key) {
    return (0, _indexOf3.default)(key, fieldsToExport) >= 0;
  };
  var removeEmptyObjects = function removeEmptyObjects(doc) {
    return (0, _omitBy3.default)(isEmptyObject, doc);
  };
  var pickFieldsToExport = function pickFieldsToExport(doc) {
    return fieldsToExport.length > 0 ? (0, _pickBy3.default)(isFieldToExport, doc) : doc;
  };

  var transform = (0, _flow3.default)((0, _map3.default)(_flat2.default), (0, _map3.default)(pickFieldsToExport), (0, _map3.default)(removeEmptyObjects));

  return transform;
};
/* eslint import/prefer-default-export: 0*/
var getExportSet = exports.getExportSet = function getExportSet(allDocs, _ref2) {
  var fieldsToExport = _ref2.fieldsToExport;

  var transform = getTransform({ fieldsToExport: fieldsToExport });
  var data = transform(allDocs);

  var keysSet = new _set2.default();
  data.forEach(function (entry) {
    return (0, _keys3.default)(entry).forEach(function (key) {
      return keysSet.add(key);
    });
  });
  var keys = [].concat((0, _toConsumableArray3.default)(keysSet.values()));
  console.log(allDocs, fieldsToExport, keys);
  return { data: data, keys: keys };
};
//# sourceMappingURL=export_utils.js.map