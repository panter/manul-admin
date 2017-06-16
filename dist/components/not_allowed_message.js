'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotAllowedMessage = function NotAllowedMessage() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement('img', { role: 'presentation', src: 'https://media.giphy.com/media/5ftsmLIqktHQA/giphy.gif' })
  );
};

NotAllowedMessage.propTypes = {
  message: _propTypes2.default.string
};

NotAllowedMessage.defaultProps = {
  message: 'Not allowed'
};

NotAllowedMessage.displayName = 'NotAllowedMessage';

exports.default = NotAllowedMessage;
//# sourceMappingURL=not_allowed_message.js.map