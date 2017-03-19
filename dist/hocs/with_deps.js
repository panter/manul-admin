'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.depsMapper = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _mantraCore = require('mantra-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var depsMapper = exports.depsMapper = function depsMapper(_context, actions) {
  return (0, _extends3.default)({
    context: function context() {
      return _context;
    }
  }, actions.manulAdmin);
};

exports.default = function () {
  return (0, _mantraCore.useDeps)(depsMapper);
};
//# sourceMappingURL=with_deps.js.map