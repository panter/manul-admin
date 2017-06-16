import React from 'react';
import { RowDefinition } from 'griddle-react';
import Griddle from './griddle';
import getGriddleColumns from '../utils/get_griddle_columns';
import CollectionActions from './collection_actions';
import GriddleFilter from '../containers/griddle-filter';

const List = (props) => {
  const {
    docs,
    docsLoaded,
    sortProperties,
    pageProperties,
    recordCount,
    collectionName,
    context,
  } = props;

  const { LocalState } = context();
  const setFilter = val =>
    LocalState.set('admin.collections.filter', val);

  return (
    <div>
      <CollectionActions collectionName={collectionName} onFilterChange={setFilter} />
      <Griddle
        data={docs}
        docsLoaded={docsLoaded}
        sortProperties={sortProperties}
        pageProperties={{
          ...pageProperties,
          recordCount,
        }}
        components={{
          Filter: GriddleFilter,
        }}
        events={{
        }}
      >
        <RowDefinition>
          {getGriddleColumns(props)}
        </RowDefinition>
      </Griddle>
    </div>
  );
};

export default List;
