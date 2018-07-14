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
const withMethodCall = (options = {}) => C =>
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
      const {
        adminContext: { methods }
      } = context();
      const methodArgs = {
        filter,
        searchTerm,
        sortProperties,
        pageProperties: !options.localMode ? pageProperties : null
      };
      if (DEBUG) console.log('calling method', methodArgs);
      const callId = Math.random();
      this.setState({
        isLoading: true,
        callId
      });
      methods[collectionName].list.call(methodArgs, (error, result) => {
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
      });
    }
    componentWillUpdate(nextProps) {
      if (!isEqual(nextProps, this.props)) {
        this.loadDataDebounced();
      }
    }
    render() {
      return (
        <C
          {...this.props}
          {...this.state}
          refresh={() => {
            this.loadData();
          }}
        />
      );
    }
  };

export const composer = (options = {}) => (
  { context, collectionName, filter: filterBase },
  onData
) => {
  const { localMode = false } = options;
  const {
    adminContext: { LocalState, config }
  } = context();
  const collectionConfig = config.collections[collectionName];

  const { listFilterSchema, defaultFilters } = collectionConfig;

  const filterLocalConfigured =
    LocalState.get(stateListFilter(collectionName)) || {};

  const filterLocal = {
    ...defaultFilters,
    ...(listFilterSchema
      ? listFilterSchema.clean(filterLocalConfigured)
      : filterLocalConfigured)
  };

  const filter = {
    ...filterLocal,
    ...filterBase
  };
  if (DEBUG) console.log('full filter', filter);
  const sortProperties = LocalState.get(stateListSort(collectionName));
  const searchTerm = LocalState.get(stateListSearch(collectionName));
  const pageProperties = LocalState.get(statePageProperties(collectionName));

  onData(null, {
    griddleLocal: localMode,
    filter,
    searchTerm,
    sortProperties,
    pageProperties
  });
};

export default options =>
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
    withMethodCall(options),
    composeWithTracker(composer(options))
  );
