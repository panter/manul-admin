'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _isString2 = require('lodash/fp/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  white-space: nowrap;\n  margin-right: 10px;\n'], ['\n  white-space: nowrap;\n  margin-right: 10px;\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  align-items: center;\n  margin-bottom: 0;\n'], ['\n  display: flex;\n  align-items: center;\n  margin-bottom: 0;\n']);

var _griddleReact = require('griddle-react');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _manulI18n = require('@panter/manul-i18n');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _enhance_with_row_data = require('../hocs/enhance_with_row_data');

var _enhance_with_row_data2 = _interopRequireDefault(_enhance_with_row_data);

var _griddle_action_button = require('./griddle_action_button');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PencilIcon = require('react-icons/lib/go/pencil');

var CustomHeadingBase = _styledComponents2.default.span(_templateObject);

var ActionCell = _styledComponents2.default.p(_templateObject2);

var ColumnDef = function ColumnDef(_ref) {
  var title = _ref.title,
      icon = _ref.icon;
  return _react2.default.createElement(
    _manulI18n.T,
    { _id: title },
    function (text) {
      var label = text || title;
      return _react2.default.createElement(
        CustomHeadingBase,
        null,
        _react2.default.createElement(
          'span',
          null,
          label
        ),
        icon && _react2.default.createElement(
          'span',
          null,
          icon
        )
      );
    }
  );
};

var getActionsColumn = function getActionsColumn(_ref2) {
  var _ref2$RowActions = _ref2.RowActions,
      RowActions = _ref2$RowActions === undefined ? [] : _ref2$RowActions,
      props = (0, _objectWithoutProperties3.default)(_ref2, ['RowActions']);
  return _react2.default.createElement(_griddleReact.ColumnDefinition, {
    id: '_actions',
    title: ' ',
    key: '_actions',
    order: -1,
    customComponent: (0, _enhance_with_row_data2.default)(function (_ref3) {
      var rowData = _ref3.rowData;
      return _react2.default.createElement(
        ActionCell,
        null,
        RowActions.map(function (Action, index) {
          return _react2.default.createElement(Action, (0, _extends3.default)({ key: index, rowData: rowData }, props));
        })
      );
    })
  });
};

var getColumns = function getColumns(_ref4) {
  var collectionName = _ref4.collectionName,
      columns = _ref4.columns,
      _ref4$columnsI18n = _ref4.columnsI18n,
      columnsI18n = _ref4$columnsI18n === undefined ? '' + collectionName : _ref4$columnsI18n;

  var getTitle = function getTitle(id) {
    return columnsI18n + '.' + id;
  };
  return columns.map(function (props, index) {
    if ((0, _isString3.default)(props)) {
      return _react2.default.createElement(_griddleReact.ColumnDefinition, {
        order: index + 1,
        key: props,
        customHeadingComponent: ColumnDef,
        title: getTitle(props),
        id: props
      });
    }
    return _react2.default.createElement(_griddleReact.ColumnDefinition, (0, _extends3.default)({
      title: getTitle(props.id),
      key: props.id
    }, props, {
      customHeadingComponent: ColumnDef,
      order: index + 1
    }));
  });
};

var EditAction = function EditAction(_ref5) {
  var collectionName = _ref5.collectionName,
      _id = _ref5.rowData._id;
  return _react2.default.createElement(_griddle_action_button.GriddleActionIconLinkButton, {
    noMinWidth: true,
    noMinHeight: true,
    routeName: 'admin.' + collectionName + '.edit',
    params: { _id: _id },
    icon: PencilIcon
  });
};

var SelectAction = function SelectAction(_ref6) {
  var onSelect = _ref6.onSelect,
      _id = _ref6.rowData._id;
  return _react2.default.createElement(
    _griddle_action_button.GriddleActionButton,
    {
      onClick: function onClick() {
        return onSelect(_id);
      }
    },
    'Select'
  );
};
var getDefaultActions = function getDefaultActions(_ref7) {
  var hideDefaultRowActions = _ref7.hideDefaultRowActions,
      isAggregation = _ref7.isAggregation,
      isLookup = _ref7.isLookup;

  if (hideDefaultRowActions) {
    return [];
  }
  if (isLookup) {
    return [SelectAction];
  }
  if (!isAggregation) {
    return [EditAction];
  }
  return [];
};

exports.default = function (_ref8) {
  var _ref8$RowActions = _ref8.RowActions,
      RowActions = _ref8$RowActions === undefined ? [] : _ref8$RowActions,
      props = (0, _objectWithoutProperties3.default)(_ref8, ['RowActions']);

  var columnDefs = getColumns(props);
  var DefaultActions = getDefaultActions(props);
  var actionColumn = getActionsColumn((0, _extends3.default)({
    RowActions: [].concat((0, _toConsumableArray3.default)(DefaultActions), (0, _toConsumableArray3.default)(RowActions)) }, props));
  return [actionColumn].concat((0, _toConsumableArray3.default)(columnDefs));
};
//# sourceMappingURL=get_griddle_columns.js.map