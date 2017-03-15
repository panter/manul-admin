import { useDeps } from 'mantra-core';

export const depsMapper = (context, actions) => ({
  context: () => context,
  ...actions.manulAdmin,
});

export default () => useDeps(depsMapper);
