import { composeWithTracker } from 'mantra-core';

export default (rolesOnly, error) => composeWithTracker((props, onData) => {
  const { Meteor, Roles } = props.context();
  if (!Meteor.loggingIn()) {
    if (Roles.userIsInRole(Meteor.userId(), rolesOnly)) {
      onData(null, props);
    } else {
      onData(new Error('not allowed'));
    }
  }
}, null, error);
