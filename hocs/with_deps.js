import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';

export const depsMapper = (context, actions) => ({
  context: () => context,
  create: actions.manulAdmin.create,
  update: actions.manulAdmin.update,
  insert: actions.manulAdmin.insert,
  destroy: actions.manulAdmin.destroy,
});

export default () => useDeps(depsMapper);
