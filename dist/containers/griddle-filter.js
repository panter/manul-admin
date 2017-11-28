'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.depsMapper = exports.composer = undefined;

var _mantraCore = require('mantra-core');

var _griddleFilter = require('../components/table/griddle-filter');

var _griddleFilter2 = _interopRequireDefault(_griddleFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composer = exports.composer = function composer(_ref, onData) {
  var context = _ref.context;

  var _context = context(),
      LocalState = _context.LocalState;

  onData(null, {
    filterValue: LocalState.get('admin.collections.filter')
  });
};

var depsMapper = exports.depsMapper = function depsMapper(_context2) {
  return {
    context: function context() {
      return _context2;
    }
  };
};

exports.default = (0, _mantraCore.composeAll)((0, _mantraCore.composeWithTracker)(composer), (0, _mantraCore.useDeps)(depsMapper))(_griddleFilter2.default);
//# sourceMappingURL=griddle-filter.js.map