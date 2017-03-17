'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.depsMapper = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _mantraCore = require('mantra-core');

var depsMapper = exports.depsMapper = function depsMapper(_context, actions) {
  return _extends({
    context: function context() {
      return _context;
    }
  }, actions.manulAdmin);
};

exports.default = function () {
  return (0, _mantraCore.useDeps)(depsMapper);
};
//# sourceMappingURL=with_deps.js.map