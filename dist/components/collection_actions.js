'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  margin-left: 5px;\n'], ['\n  margin-left: 5px;\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  margin: 15px 0;\n  text-align: right;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n'], ['\n  margin: 15px 0;\n  text-align: right;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _manulI18n = require('@panter/manul-i18n');

var _manulI18n2 = _interopRequireDefault(_manulI18n);

var _link_button = require('../containers/link_button');

var _link_button2 = _interopRequireDefault(_link_button);

var _collection_filter = require('./collection_filter');

var _collection_filter2 = _interopRequireDefault(_collection_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActionButton = (0, _styledComponents2.default)(_link_button2.default)(_templateObject);

var CollectionActions = function CollectionActions(_ref) {
  var collectionName = _ref.collectionName,
      className = _ref.className,
      onFilterChange = _ref.onFilterChange;
  return _react2.default.createElement(
    'div',
    { className: className },
    _react2.default.createElement(
      'div',
      { style: { flex: 1 } },
      _react2.default.createElement(_collection_filter2.default, { onFilterChange: onFilterChange })
    ),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _manulI18n.T,
        { _id: ['admin.' + collectionName + '.create', 'admin.create'] },
        function (text) {
          return _react2.default.createElement(
            ActionButton,
            { routeName: 'admin.' + collectionName + '.create', color: 'primary' },
            text
          );
        }
      )
    )
  );
};

exports.default = (0, _styledComponents2.default)(CollectionActions)(_templateObject2);
//# sourceMappingURL=collection_actions.js.map