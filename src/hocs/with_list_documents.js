
import { composeWithTracker } from 'mantra-core';
import { filterToQuery, gridOptionsToQueryOptions } from '../utils/query_utils';
import { stateListFilter, stateListSort, statePageProperties, stateListSearch } from '../utils/local_state_utils';


export const composer = () => (
  { context, publications, collection, collectionName, searchFields, sortCursor = false }, onData,
) => {
  const { adminContext: { Meteor, LocalState, Counts } } = context();
  const filter = LocalState.get(stateListFilter(collectionName));
  const sortProperties = LocalState.get(stateListSort(collectionName));
  const searchTerm = LocalState.get(stateListSearch(collectionName));
  const pageProperties = LocalState.get(statePageProperties(collectionName));
  const docsLoaded = Meteor.subscribe(publications.list, filter).ready();
  const query = filterToQuery(filter, { searchTerm, searchFields });
  const docs = collection.find(
    query,
    { ...(sortCursor && gridOptionsToQueryOptions({ sortProperties, pageProperties })) },
  ).fetch();
  const recordCount = Counts.get(publications.counts);
  onData(null,
    { docsLoaded, docs, filter, searchTerm, sortProperties, pageProperties, recordCount },
  );
};


export default () => composeWithTracker(composer());
