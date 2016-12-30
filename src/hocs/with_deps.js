import { useDeps } from 'mantra-core';

export const depsMapper = (context, actions) => ({
  context: () => context,
  create: actions.manulAdmin.create,
  update: actions.manulAdmin.update,
  insert: actions.manulAdmin.insert,
  destroy: actions.manulAdmin.destroy,
  gotoEdit: actions.manulAdmin.gotoEdit,
  gotoUpdate: actions.manulAdmin.gotoUpdate,
  gotoList: actions.manulAdmin.gotoList,
});

export default () => useDeps(depsMapper);
