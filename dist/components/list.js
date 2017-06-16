'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _griddleReact = require('griddle-react');

var _griddle = require('./griddle');

var _griddle2 = _interopRequireDefault(_griddle);

var _get_griddle_columns = require('../utils/get_griddle_columns');

var _get_griddle_columns2 = _interopRequireDefault(_get_griddle_columns);

var _collection_actions = require('./collection_actions');

var _collection_actions2 = _interopRequireDefault(_collection_actions);

var _griddleFilter = require('../containers/griddle-filter');

var _griddleFilter2 = _interopRequireDefault(_griddleFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = function List(props) {
  var docs = props.docs,
      docsLoaded = props.docsLoaded,
      sortProperties = props.sortProperties,
      pageProperties = props.pageProperties,
      recordCount = props.recordCount,
      collectionName = props.collectionName,
      context = props.context;

  var _context = context(),
      LocalState = _context.LocalState;

  var setFilter = function setFilter(val) {
    return LocalState.set('admin.collections.filter', val);
  };

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_collection_actions2.default, { collectionName: collectionName, onFilterChange: setFilter }),
    _react2.default.createElement(
      _griddle2.default,
      {
        data: docs,
        docsLoaded: docsLoaded,
        sortProperties: sortProperties,
        pageProperties: (0, _extends3.default)({}, pageProperties, {
          recordCount: recordCount
        }),
        components: {
          Filter: _griddleFilter2.default
        },
        events: {}
      },
      _react2.default.createElement(
        _griddleReact.RowDefinition,
        null,
        (0, _get_griddle_columns2.default)(props)
      )
    )
  );
};

exports.default = List;
//# sourceMappingURL=list.js.map