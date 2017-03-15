'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _mantraCore = require('mantra-core');

var depsMapper = function depsMapper(_context, actions) {
  return _extends({
    context: function context() {
      return _context;
    }
  }, actions.manulAdmin);
};

exports.depsMapper = depsMapper;

exports['default'] = function () {
  return (0, _mantraCore.useDeps)(depsMapper);
};
//# sourceMappingURL=with_deps.js.map