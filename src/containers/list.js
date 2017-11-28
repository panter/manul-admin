import { useDeps, composeAll } from 'mantra-core';
import List from '../components/list';
import fromContext from '../hocs/component_from_context_or';

export const depsMapper = (context, actions) => ({
  context: () => context,
  downloadCsv: actions.manulAdmin.downloadCsv,
});

export default composeAll(
  useDeps(depsMapper),
)(fromContext('views.list', List));
