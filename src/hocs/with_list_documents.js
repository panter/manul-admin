
import { composeWithTracker } from 'mantra-core';
import { filterToQuery, gridOptionsToQueryOptions } from '../utils/query_utils';
import { stateListFilter, stateListSort, statePageProperties, stateListSearch } from '../utils/local_state_utils';


export const composer = () => (
  {
    context,
    publications,
    collection,
    collectionName,
    searchFields,
    sortCursor = false,
    filter: filterProps,
    transformFilter,
    sortProperties: sortPropertiesProps,
    searchTerm: searchTermProps,
    pageProperties: pagePropertiesProps,
  }, onData,
) => {
  const { adminContext: { Meteor, LocalState, Counts } } = context();
  const filter = filterProps || LocalState.get(stateListFilter(collectionName));
  const sortProperties = sortPropertiesProps || LocalState.get(stateListSort(collectionName));
  const searchTerm = searchTermProps || LocalState.get(stateListSearch(collectionName));
  const pageProperties = pagePropertiesProps || LocalState.get(statePageProperties(collectionName));
  const docsLoaded = Meteor.subscribe(publications.list, filter).ready();
  const query = filterToQuery(filter, { searchTerm, searchFields }, transformFilter);
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
