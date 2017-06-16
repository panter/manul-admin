'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _griddleReact = require('griddle-react');

var rowDataSelector = _griddleReact.plugins.LocalPlugin.selectors.rowDataSelector;
exports.default = (0, _reactRedux.connect)(function (state, props) {
  return {
    rowData: rowDataSelector(state, props)
  };
});
//# sourceMappingURL=enhance_with_row_data.js.map