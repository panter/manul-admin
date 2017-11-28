'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.depsMapper = exports.composer = undefined;

var _mantraCore = require('mantra-core');

var _document_preview = require('../components/document_preview');

var _document_preview2 = _interopRequireDefault(_document_preview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultPreview = function defaultPreview(doc) {
  return doc._id;
};

var composer = exports.composer = function composer(_ref, onData) {
  var context = _ref.context,
      docId = _ref.docId,
      doc = _ref.doc,
      docLoaded = _ref.docLoaded,
      _ref$getPreviewLabel = _ref.getPreviewLabel,
      getPreviewLabel = _ref$getPreviewLabel === undefined ? defaultPreview : _ref$getPreviewLabel;

  if (doc && docLoaded) {
    var label = getPreviewLabel(doc);
    onData(null, { label: label });
  } else {
    onData(null, { label: docId });
  }
};

var depsMapper = exports.depsMapper = function depsMapper(_context) {
  return {
    context: function context() {
      return _context;
    }
  };
};

exports.default = (0, _mantraCore.composeAll)((0, _mantraCore.composeWithTracker)(composer), (0, _mantraCore.useDeps)(depsMapper))(_document_preview2.default);
//# sourceMappingURL=document_preview.js.map