'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.depsMapper = undefined;

var _mantraCore = require('mantra-core');

var _list = require('../components/list');

var _list2 = _interopRequireDefault(_list);

var _component_from_context_or = require('../hocs/component_from_context_or');

var _component_from_context_or2 = _interopRequireDefault(_component_from_context_or);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var depsMapper = exports.depsMapper = function depsMapper(_context, actions) {
  return {
    context: function context() {
      return _context;
    },
    downloadCsv: actions.manulAdmin.downloadCsv
  };
};

exports.default = (0, _mantraCore.composeAll)((0, _mantraCore.useDeps)(depsMapper))((0, _component_from_context_or2.default)('views.list', _list2.default));
//# sourceMappingURL=list.js.map