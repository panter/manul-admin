import React from 'react';
import PropTypes from 'prop-types';
import NotAllowedMessage from './not_allowed_message';

const NotAllowed = ({
  MainLayout,
}) => (
  MainLayout ?
    <MainLayout content={() => <NotAllowedMessage />} /> :
    <NotAllowedMessage />
);

NotAllowed.propTypes = {
  MainLayout: PropTypes.element,
};

export default NotAllowed;
