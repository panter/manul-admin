import { useDeps } from '@storybook/mantra-core';

export const depsMapper = (context, actions) => ({
  context: () => context,
  ...actions.manulAdmin,
});

export default () => useDeps(depsMapper);
