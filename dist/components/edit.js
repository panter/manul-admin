'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _manulI18n = require('@panter/manul-i18n');

var _AutoForm = require('./forms/AutoForm');

var _AutoForm2 = _interopRequireDefault(_AutoForm);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DocumentEdit = function DocumentEdit(_ref) {
  var doc = _ref.doc,
      collectionName = _ref.collectionName,
      schema = _ref.schema,
      title = _ref.title,
      destroy = _ref.destroy,
      gotoList = _ref.gotoList,
      upsert = _ref.upsert;

  var formActions = _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _manulI18n.T,
      { _id: 'admin.back-to-list' },
      function (alt) {
        return _react2.default.createElement(
          _button2.default,
          { onClick: function onClick() {
              return gotoList(collectionName);
            } },
          alt
        );
      }
    ),
    _react2.default.createElement(
      _manulI18n.T,
      { _id: 'admin.destroy' },
      function (alt) {
        return _react2.default.createElement(
          _button2.default,
          { color: 'danger', onClick: function onClick() {
              return destroy(collectionName, doc._id);
            } },
          alt
        );
      }
    )
  );

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'h2',
      null,
      'Edit ',
      title
    ),
    _react2.default.createElement(_AutoForm2.default, {
      model: doc,
      schema: schema,
      onSubmit: function onSubmit(changedDoc) {
        return upsert(collectionName, changedDoc);
      },
      additionalActions: formActions
    })
  );
};

DocumentEdit.propTypes = {};

DocumentEdit.defaultProps = {};

DocumentEdit.displayName = 'DocumentEdit';

exports.default = DocumentEdit;
//# sourceMappingURL=edit.js.map