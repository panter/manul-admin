'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.depsMapper = exports.composer = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _mantraCore = require('mantra-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composer = function composer(_ref, onData) {
  var context = _ref.context,
      nav = (0, _objectWithoutProperties3.default)(_ref, ['context']);

  var _context = context(),
      manulRouter = _context.manulRouter;

  onData(null, (0, _extends3.default)({}, manulRouter.createNavItem(nav)));
};

exports.composer = composer;
var depsMapper = exports.depsMapper = function depsMapper(_context2) {
  return {
    context: function context() {
      return _context2;
    }
  };
};

exports.default = function (C) {
  return (0, _mantraCore.composeAll)((0, _mantraCore.composeWithTracker)(composer), (0, _mantraCore.useDeps)(depsMapper))(C);
};
//# sourceMappingURL=link.js.map