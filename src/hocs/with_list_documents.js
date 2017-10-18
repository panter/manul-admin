
import composeWithTracker from '../utils/composeWithTracker';
import { filterToQuery, sortPropsToMongoSort } from '../utils/query_utils';
import { stateListFilter, stateListSort, statePageProperties, stateListSearch } from '../utils/local_state_utils';


export const composer = () => (
  {
    context,
    publications,
    collection,
    collectionName,
    searchFields,
    sortCursor = false,
    filter: filterBase,
    transformFilter,
  }, onData,
) => {
  const { adminContext: { Meteor, LocalState, Counts } } = context();
  const filterLocal = LocalState.get(stateListFilter(collectionName));
  const filter = {
    ...filterLocal,
    ...filterBase,
  };
  const sortProperties = LocalState.get(stateListSort(collectionName));
  const searchTerm = LocalState.get(stateListSearch(collectionName));
  const pageProperties = LocalState.get(statePageProperties(collectionName));
  const docsLoaded = Meteor.subscribe(
    publications.list, filter, searchTerm, sortProperties,
  ).ready();
  const query = filterToQuery(filter, { searchTerm, searchFields }, transformFilter);
  const docs = collection.find(
    query,
    {
      sort: sortPropsToMongoSort(sortProperties),
    },
  ).fetch();
  const recordCount = Counts.get(publications.counts);
  onData(null,
    { docsLoaded, docs, filter, searchTerm, sortProperties, pageProperties, recordCount },
  );
};


export default () => composeWithTracker(composer());
