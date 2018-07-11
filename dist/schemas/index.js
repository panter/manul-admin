'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListSchema = undefined;

var _simplSchema = require('simpl-schema');

var _simplSchema2 = _interopRequireDefault(_simplSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint import/prefer-default-export: 0*/

var ListSchema = exports.ListSchema = new _simplSchema2.default({
  filter: {
    type: Object,
    optional: true,
    blackbox: true
  },
  searchTerm: {
    type: String,
    optional: true
  },
  sortProperties: {
    type: Array,
    optional: true
  },
  'sortProperties.$': {
    type: Object,
    optional: true,
    blackbox: true
  },
  pageProperties: {
    type: Object,
    optional: true,
    blackbox: true
  }
});
//# sourceMappingURL=index.js.map