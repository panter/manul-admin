import { composeAll } from '@storybook/react-komposer';
import { isEqual, debounce } from 'lodash';
import { withHandlers } from 'recompose';
import React from 'react';

import {
  stateListFilter,
  stateListSort,
  statePageProperties,
  stateListSearch
} from '../utils/local_state_utils';
import composeWithTracker from '../utils/composeWithTracker';

const DEBUG = false;
/* eslint react/display-name: 0*/
const withMethodCall = C =>
  class extends React.Component {
    state = {
      callId: undefined,
      isLoading: true,
      docs: [],
      recordCount: 0
    };
    componentDidMount() {
      this.loadDataDebounced();
    }
    loadDataDebounced = debounce(this.loadData, 300);
    loadData() {
      const {
        context,
        collectionName,
        filter,
        searchTerm,
        sortProperties,
        pageProperties
      } = this.props;
      const { adminContext: { methods } } = context();
      if (DEBUG)
        console.log('calling method', {
          filter,
          searchTerm,
          sortProperties,
          pageProperties
        });
      const callId = Math.random();
      this.setState({
        isLoading: true,
        callId
      });
      methods[collectionName].list.call(
        {
          filter,
          searchTerm,
          sortProperties,
          pageProperties
        },
        (error, result) => {
          if (error) {
            console.error(error);
          } else {
            if (DEBUG) console.log('got result', error, result);
            if (this.state.callId === callId) {
              this.setState({
                isLoading: false,
                docs: result.docs,
                recordCount: result.count
              });
            } else if (DEBUG)
              console.log('ignore', searchTerm, callId, this.state.callId);
          }
        }
      );
    }
    componentWillUpdate(nextProps) {
      if (!isEqual(nextProps, this.props)) {
        this.loadDataDebounced();
      }
    }
    render() {
      return <C {...this.props} {...this.state} />;
    }
  };

export const composer = () => (
  { context, collectionName, filter: filterBase },
  onData
) => {
  const { adminContext: { LocalState } } = context();
  const filterLocal = LocalState.get(stateListFilter(collectionName));
  const filter = {
    ...filterLocal,
    ...filterBase
  };
  const sortProperties = LocalState.get(stateListSort(collectionName));
  const searchTerm = LocalState.get(stateListSearch(collectionName));
  const pageProperties = LocalState.get(statePageProperties(collectionName));

  onData(null, {
    filter,
    searchTerm,
    sortProperties,
    pageProperties
  });
};

export default () =>
  composeAll(
    withHandlers({
      exportCurrentSearchAsCsv: ({
        exportCsv,
        collectionName,
        filter,
        searchTerm,
        sortProperties
      }) => (...exportArgs) => {
        exportCsv(
          { collectionName, filter, searchTerm, sortProperties },
          ...exportArgs
        );
      }
    }),
    withMethodCall,
    composeWithTracker(composer())
  );
