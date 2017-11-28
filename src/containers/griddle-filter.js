import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import GriddleFilter from '../components/table/griddle-filter';

export const composer = ({ context }, onData) => {
  const { LocalState } = context();
  onData(null, {
    filterValue: LocalState.get('admin.collections.filter'),
  });
};

export const depsMapper = (context) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper),
)(GriddleFilter);
