import routes from './routes';
import actions from './actions';
import { stateListSort, statePageProperties } from './utils/local_state_utils';

const load = ({ LocalState, adminContext }) => {
  if (!adminContext) {
    throw new Error(
      'Please provide a adminContext-object in your mantra-context. use createAdminContext for that'
    );
  }
  // set initial values
  Object.keys(adminContext.config.collections).forEach(collectionName => {
    LocalState.set(stateListSort(collectionName), []);
    LocalState.set(statePageProperties(collectionName), {
      currentPage: 1,
      pageSize: 20
    });
  });
};

export default { routes, actions, load };
