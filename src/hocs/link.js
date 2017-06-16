import { useDeps, composeAll, composeWithTracker } from 'mantra-core';

export const composer = ({ context, ...nav }, onData) => {
  const { manulRouter } = context();
  onData(null, {
    ...manulRouter.createNavItem(nav),
  });
};

export const depsMapper = context => ({
  context: () => context,
});

export default C => composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper),
)(C);
