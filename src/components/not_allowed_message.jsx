import React from 'react';
import PropTypes from 'prop-types';

const NotAllowedMessage = () => (
  <div >
    <img role="presentation" src="https://media.giphy.com/media/5ftsmLIqktHQA/giphy.gif" />
  </div>
  );

NotAllowedMessage.propTypes = {
  message: PropTypes.string,
};

NotAllowedMessage.defaultProps = {
  message: 'Not allowed',
};

NotAllowedMessage.displayName = 'NotAllowedMessage';

export default NotAllowedMessage;
