import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import UsersEdit from '../components/users_edit';

export const userComposer = ({ context, doc }, onData) => {
  onData(null, { user: doc });
};

export const adminComposer = ({ context, user }, onData) => {
  const { Roles } = context();
  if (user) {
    const isAdmin = Roles.userIsInRole(user._id, 'admin', Roles.GLOBAL_GROUP);
    onData(null, { isAdmin });
    return;
  }
  onData(null, { });
};


export const depsMapper = (context, actions) => ({
  context: () => context,
  upgradeToAdmin: actions.admin.upgradeToAdmin,
  revokeAdmin: actions.admin.revokeAdmin,
  update: actions.manulAdmin.update,
});

export default composeAll(
  composeWithTracker(adminComposer),
  composeWithTracker(userComposer),
  useDeps(depsMapper),
)(UsersEdit);
