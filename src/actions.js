import { find } from 'lodash/fp';
import Papa from 'papaparse';
import _ from 'lodash';
import flat from 'flat';

import { getExportSet } from './utils/export_utils';
import {
  stateListFilter,
  stateListSort,
  statePageProperties,
  stateListSearch
} from './utils/local_state_utils';
import FallbackAlerts from './fallback_alerts';
import csv from './utils/csv';
import routeUtils from './utils/route_utils';

export default {
  manulAdmin: {
    gotoCreate({ adminContext: { gotoRoute } }, collectionName) {
      gotoRoute(routeUtils.getCreateRoute(collectionName).name);
    },
    gotoEdit({ adminContext: { gotoRoute } }, collectionName, _id) {
      gotoRoute(routeUtils.getEditRoute(collectionName).name, { _id });
    },
    gotoList({ adminContext: { gotoRoute } }, collectionName) {
      gotoRoute(routeUtils.getListRoute(collectionName).name);
    },
    // sortProperty is according to react-griddle
    listSortToggle({ LocalState }, collectionName, newSortProperty) {
      const localStateSortProperties = stateListSort(collectionName);
      const sortProperties = LocalState.get(localStateSortProperties) || [];
      const oldProperty = find(s => s.id === newSortProperty.id)(
        sortProperties
      );
      let newSortProps = [];

      if (!oldProperty) {
        newSortProps = [{ ...newSortProperty, sortAscending: true }];
      } else {
        newSortProps = _.without(sortProperties, oldProperty);
        if (oldProperty.sortAscending) {
          newSortProps = [{ ...newSortProperty, sortAscending: false }];
        }
      }
      LocalState.set(localStateSortProperties, newSortProps);
    },
    listSetSort({ LocalState }, collectionName, sortProperties) {
      LocalState.set(stateListSort(collectionName), sortProperties);
    },
    listSetFilter({ LocalState }, collectionName, filter) {
      LocalState.set(stateListFilter(collectionName), filter);
    },
    listSetSearchTerm({ LocalState }, collectionName, searchTerm) {
      // reset pagination if changed
      const pageProperties = LocalState.get(
        statePageProperties(collectionName)
      );
      LocalState.set(statePageProperties(collectionName), {
        ...pageProperties,
        currentPage: 1
      });
      LocalState.set(stateListSearch(collectionName), searchTerm);
    },
    listSetPageProperties({ LocalState }, collectionName, pageProperties) {
      LocalState.set(statePageProperties(collectionName), pageProperties);
    },
    listGotoPage({ LocalState }, collectionName, currentPage) {
      const pageProperties = LocalState.get(
        statePageProperties(collectionName)
      );
      LocalState.set(statePageProperties(collectionName), {
        ...pageProperties,
        currentPage
      });
    },
    listGotoNextPage({ LocalState }, collectionName) {
      const pageProperties = LocalState.get(
        statePageProperties(collectionName)
      );
      LocalState.set(statePageProperties(collectionName), {
        ...pageProperties,
        currentPage: pageProperties.currentPage + 1
      });
    },
    listGotoPreviousPage({ LocalState }, collectionName) {
      const pageProperties = LocalState.get(
        statePageProperties(collectionName)
      );
      LocalState.set(statePageProperties(collectionName), {
        ...pageProperties,
        currentPage: pageProperties.currentPage - 1
      });
    },
    update(
      { adminContext: { methods, gotoRoute }, Alerts = FallbackAlerts },
      collectionName,
      doc,
      onSuccess = () => gotoRoute(routeUtils.getListRoute(collectionName).name)
    ) {
      const handleCallback =
        (Alerts.handleCallback && Alerts.handleCallback.bind(Alerts)) ||
        FallbackAlerts.handleCallback.bind(FallbackAlerts);
      methods[collectionName].update.call(
        doc,
        handleCallback(
          'admin.update',
          { props: () => ({ collectionName, doc }) },
          error => {
            if (!error) {
              onSuccess({ collectionName, doc, _id: doc._id });
            }
          }
        )
      );
    },
    create(
      { adminContext: { methods, gotoRoute }, Alerts = FallbackAlerts },
      collectionName,
      doc,
      onSuccess = ({ _id }) =>
        gotoRoute(routeUtils.getEditRoute(collectionName).name, { _id })
    ) {
      const handleCallback =
        (Alerts.handleCallback && Alerts.handleCallback.bind(Alerts)) ||
        FallbackAlerts.handleCallback.bind(FallbackAlerts);
      methods[collectionName].create.call(
        doc,
        handleCallback(
          'admin.create',
          { props: () => ({ collectionName, doc }) },
          (error, _id) => {
            if (!error) {
              onSuccess({ collectionName, _id });
            }
          }
        )
      );
    },
    destroy(
      { adminContext: { methods, gotoRoute }, Alerts = FallbackAlerts },
      collectionName,
      _id,
      onSuccess = () => gotoRoute(routeUtils.getListRoute(collectionName).name)
    ) {
      /* eslint no-alert: 0*/
      const confirmed = window.confirm("Really destroy? This can't be undone");
      const handleCallback =
        (Alerts.handleCallback && Alerts.handleCallback.bind(Alerts)) ||
        FallbackAlerts.handleCallback.bind(FallbackAlerts);
      if (confirmed) {
        methods[collectionName].destroy.call(
          { _id },
          handleCallback(
            'admin.destroy',
            { props: () => ({ collectionName, _id }) },
            error => {
              if (!error) {
                onSuccess({ collectionName, _id });
              }
            }
          )
        );
      }
    },
    exportCsvFromLocalDocs(
      { adminContext: { methods }, Alerts = FallbackAlerts },
      docs,
      {
        filename = 'export.csv',
        fieldsToExport = [],
        onCompleted,
        ...options
      } = {}
    ) {
      const { data, keys } = getExportSet(docs, { fieldsToExport });
      csv.exportAsCsv({ filename, data, keys, ...options });
      if (onCompleted) onCompleted();
    },
    exportCsv(
      { adminContext: { methods }, Alerts = FallbackAlerts },
      { collectionName, filter, searchTerm, sortProperties },
      {
        filename = 'export.csv',
        fieldsToExport = [],
        onProgress,
        onCompleted,
        ...options
      } = {}
    ) {
      const methodProps = {
        filter,
        searchTerm,
        sortProperties
      };
      methods[collectionName].listCount.call(
        methodProps,
        (countError, totalCount) => {
          let allDocs = [];
          let currentPage = 1;
          const pageSize = 1000;
          const _onExportCompleted = () => {
            const { data, keys } = getExportSet(allDocs, { fieldsToExport });

            csv.exportAsCsv({ filename, data, keys, ...options });
            if (onCompleted) onCompleted();
          };
          const _fetchChunk = () => {
            const pageProperties = {
              currentPage,
              pageSize
            };
            methods[collectionName].list.call(
              {
                ...methodProps,
                pageProperties
              },
              (listError, result) => {
                allDocs = [...allDocs, ...result.docs];
                const progress = allDocs.length / totalCount;
                if (onProgress) {
                  onProgress(progress);
                }
                if (result.docs.length === 0 || allDocs.length >= totalCount) {
                  _onExportCompleted();
                } else {
                  currentPage += 1;
                  _fetchChunk();
                }
              }
            );
          };
          _fetchChunk();
        }
      );
    },
    importCsv(
      { adminContext: { methods } },
      {
        collectionName,
        file,
        onInsert = _.noop,
        onUpdate = _.noop,
        onComplete = _.noop
      }
    ) {
      let counter = -1;
      const imported = new Set();
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete({ data }) {
          data.forEach(entryUncleaned => {
            counter += 1;
            const index = counter; // need constant closure copy
            const checkForComplete = () => {
              imported.add(index);
              if (imported.size === data.length) {
                onComplete();
              }
            };
            // console.log('uncleaned', entryUncleaned);
            const entry = flat.unflatten(
              _.omitBy(entryUncleaned, value => value === 'NULL')
            );
            // console.log('cleaned', entry);
            if (entry._id) {
              methods[collectionName].update.call(entry, error => {
                onUpdate(index, error, entry);
                checkForComplete();
              });
            } else {
              delete entry._id; // if falsy
              methods[collectionName].create.call(entry, (error, _id) => {
                onInsert(index, error, { _id, ...entry });
                checkForComplete();
              });
            }
          });
        }
      });
    }
  }
};
