'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _manulI18n = require('@panter/manul-i18n');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

var _edit = require('../containers/edit');

var _edit2 = _interopRequireDefault(_edit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UsersEdit = function UsersEdit(_ref) {
  var upgradeToAdmin = _ref.upgradeToAdmin,
      revokeAdmin = _ref.revokeAdmin,
      _ref$isAdmin = _ref.isAdmin,
      isAdmin = _ref$isAdmin === undefined ? false : _ref$isAdmin,
      props = (0, _objectWithoutProperties3.default)(_ref, ['upgradeToAdmin', 'revokeAdmin', 'isAdmin']);
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _button2.default,
      {
        variant: 'danger',
        black: !isAdmin,
        onClick: function onClick() {
          if (isAdmin) {
            revokeAdmin(props.params._id);
          } else {
            upgradeToAdmin(props.params._id);
          }
        }
      },
      _react2.default.createElement(
        _manulI18n.T,
        null,
        isAdmin ? 'user.admin.actions.revokeAdmin' : 'user.admin.actions.upgradeToAdmin'
      )
    ),
    _react2.default.createElement(_edit2.default, props)
  );
};

UsersEdit.propTypes = {};

UsersEdit.defaultProps = {};

UsersEdit.displayName = 'UsersEdit';

exports.default = UsersEdit;
//# sourceMappingURL=users_edit.js.map