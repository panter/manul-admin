'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactstrap = require('reactstrap');

var _search = require('react-icons/lib/fa/search');

var _search2 = _interopRequireDefault(_search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Filter = function Filter(_ref) {
  var onFilterChange = _ref.onFilterChange;
  return _react2.default.createElement(
    _reactstrap.InputGroup,
    null,
    _react2.default.createElement(_reactstrap.Input, { onChange: function onChange(e) {
        return onFilterChange(e.target.value);
      }, placeholder: 'search for...' }),
    _react2.default.createElement(
      _reactstrap.InputGroupAddon,
      null,
      _react2.default.createElement(_search2.default, null)
    )
  );
};

exports.default = Filter;
//# sourceMappingURL=collection_filter.js.map