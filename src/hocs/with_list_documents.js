
import { composeWithTracker } from 'mantra-core';
import { filterToQuery, gridOptionsToQueryOptions } from '../utils/query_utils';
import { stateListFilter, stateListSort, statePageProperties } from '../utils/local_state_utils';


export const composer = () => ({ context, publications, collection, collectionName }, onData) => {
  const { Meteor, LocalState } = context();
  const filter = LocalState.get(stateListFilter(collectionName));
  const sortProperties = LocalState.get(stateListSort(collectionName));
  const pageProperties = LocalState.get(statePageProperties(collectionName));
  Meteor.subscribe(publications.list, filter, { sortProperties, pageProperties });
  const query = filterToQuery(filter);
  const docs = collection.find(
    query,
    gridOptionsToQueryOptions({ sortProperties, pageProperties }),
  ).fetch();
  onData(null, { docs, filter, sortProperties, pageProperties, docsCount });
};


export default () => composeWithTracker(composer());
