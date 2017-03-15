import Papa from 'papaparse';
import _ from 'lodash';
import flat from 'flat';

import FallbackAlerts from './fallback_alerts';
import csv from './utils/csv';
import routeUtils from './utils/route_utils';
import { stateListFilter, stateListSort, statePageProperties } from './utils/local_state_utils';


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
      const oldProperty = _.find(sortProperties, s => s.id === newSortProperty.id);
      let newSortProps = [];

      if (!oldProperty) {
        newSortProps = [{ ...newSortProperty, sortAscending: true }, ...sortProperties];
      } else {
        newSortProps = _.without(sortProperties, oldProperty);
        if (oldProperty.sortAscending) {
          newSortProps = [{ ...newSortProperty, sortAscending: false }, ...newSortProps];
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
    listSetPageProperties({ LocalState }, collectionName, pageProperties) {
      LocalState.set(statePageProperties(collectionName), pageProperties);
    },
    listGotoPage({ LocalState }, collectionName, currentPage) {
      const pageProperties = LocalState.get(statePageProperties(collectionName));
      LocalState.set(statePageProperties(collectionName), { ...pageProperties, currentPage });
    },
    listGotoNextPage({ LocalState }, collectionName) {
      const pageProperties = LocalState.get(statePageProperties(collectionName));
      LocalState.set(statePageProperties(
        collectionName),
        { ...pageProperties, currentPage: pageProperties.currentPage + 1 },
      );
    },
    listGotoPreviousPage({ LocalState }, collectionName) {
      const pageProperties = LocalState.get(statePageProperties(collectionName));
      LocalState.set(statePageProperties(
        collectionName), { ...pageProperties, currentPage: pageProperties.currentPage - 1 },
      );
    },
    update(
      { adminContext: { methods, gotoRoute }, Alerts = FallbackAlerts },
      collectionName, doc,
    ) {
      methods[collectionName].update.call(doc,
        Alerts.handleCallback('admin.update', { props: () => ({ collectionName, doc }) }, (error) => {
          if (!error) {
            gotoRoute(routeUtils.getListRoute(collectionName).name);
          }
        }),
    );
    },
    create(
      { adminContext: { methods, gotoRoute }, Alerts = FallbackAlerts },
      collectionName, doc,
    ) {
      methods[collectionName].create.call(doc,
        Alerts.handleCallback('admin.create', { props: () => ({ collectionName, doc }) }, (error, _id) => {
          if (!error) {
            gotoRoute(routeUtils.getEditRoute(collectionName).name, { _id });
          }
        }),
    );
    },
    destroy(
      { adminContext: { methods, gotoRoute }, Alerts = FallbackAlerts },
      collectionName, _id,
    ) {
      /* eslint no-alert: 0*/
      const confirmed = window.confirm("Really destroy? This can't be undone");
      if (confirmed) {
        methods[collectionName].destroy.call({ _id },
          Alerts.handleCallback('admin.destroy', { props: () => ({ collectionName, _id }) }, (error) => {
            if (!error) {
              gotoRoute(routeUtils.getListRoute(collectionName).name);
            }
          }),
      );
      }
    },
    downloadCsv(
      { adminContext: { methods }, Alerts = FallbackAlerts },
      collectionName, options,
    ) {
      methods[collectionName].export.call({},
        Alerts.handleCallback('admin.export', { props: () => ({ collectionName }) }, (error, { data, keys }) => {
          if (!error) {
            csv.exportAsCsv({ filename: `export_${collectionName}`, data, keys, ...options });
          }
        }),
      );
    },
    importCsv(
      { adminContext: { methods } },
      { collectionName, file, onInsert = _.noop, onUpdate = _.noop, onComplete = _.noop },
    ) {
      let counter = -1;
      const imported = new Set();
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete({ data }) {
          data.forEach((entryUncleaned) => {
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
              _.omitBy(entryUncleaned, value => value === 'NULL'),
            );
            // console.log('cleaned', entry);
            if (entry._id) {
              methods[collectionName].update.call(entry, (error) => {
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
        },
      });
    },
  },
};
