'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.depsMapper = exports.composer = undefined;

var _mantraCore = require('mantra-core');

var _manulI18n = require('@panter/manul-i18n');

var _edit = require('../components/edit');

var _edit2 = _interopRequireDefault(_edit);

var _component_from_context_or = require('../hocs/component_from_context_or');

var _component_from_context_or2 = _interopRequireDefault(_component_from_context_or);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composer = exports.composer = function composer(_ref, onData) {
  var context = _ref.context,
      _id = _ref.params._id,
      docLoaded = _ref.docLoaded,
      doc = _ref.doc,
      update = _ref.update,
      create = _ref.create,
      allowInsertWithId = _ref.allowInsertWithId;

  if (docLoaded) {
    if (!doc && allowInsertWithId) {
      onData(null, { upsert: create, doc: { _id: _id } });
    } else {
      onData(null, { upsert: update, doc: doc });
    }
  }
};

var depsMapper = exports.depsMapper = function depsMapper(_context) {
  return {
    context: function context() {
      return _context;
    }
  };
};

exports.default = (0, _mantraCore.composeAll)((0, _mantraCore.compose)(composer), (0, _manulI18n.withTranslatedSchema)(function (_ref2) {
  var collectionName = _ref2.collectionName;
  return { schema: collectionName };
}), (0, _mantraCore.useDeps)(depsMapper))((0, _component_from_context_or2.default)('views.edit', _edit2.default));
//# sourceMappingURL=edit.js.map