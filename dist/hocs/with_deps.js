'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _mantraCore = require('mantra-core');

var depsMapper = function depsMapper(_context, actions) {
  return {
    context: function context() {
      return _context;
    },
    create: actions.manulAdmin.create,
    update: actions.manulAdmin.update,
    insert: actions.manulAdmin.insert,
    destroy: actions.manulAdmin.destroy,
    gotoEdit: actions.manulAdmin.gotoEdit,
    gotoUpdate: actions.manulAdmin.gotoUpdate,
    gotoList: actions.manulAdmin.gotoList
  };
};

exports.depsMapper = depsMapper;

exports['default'] = function () {
  return (0, _mantraCore.useDeps)(depsMapper);
};
//# sourceMappingURL=with_deps.js.map