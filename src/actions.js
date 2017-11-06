import Papa from 'papaparse';
import _ from 'lodash';
import flat from 'flat';
import { flow, find, map } from 'lodash/fp';
import FallbackAlerts from './fallback_alerts';
import csv from './utils/csv';
import routeUtils from './utils/route_utils';
import { stateListFilter, stateListSort, statePageProperties, stateListSearch } from './utils/local_state_utils';


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
      const oldProperty = find(s => s.id === newSortProperty.id)(sortProperties);
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
      LocalState.set(stateListSearch(collectionName), searchTerm);
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
      onSuccess = () => gotoRoute(routeUtils.getListRoute(collectionName).name),
    ) {
      const handleCallback = (
        (Alerts.handleCallback && Alerts.handleCallback.bind(Alerts)) ||
        FallbackAlerts.handleCallback.bind(FallbackAlerts)
      );
      methods[collectionName].update.call(doc,
        handleCallback('admin.update', { props: () => ({ collectionName, doc }) }, (error) => {
          if (!error) {
            onSuccess({ collectionName, doc, _id: doc._id });
          }
        }),
    );
    },
    create(
      { adminContext: { methods, gotoRoute }, Alerts = FallbackAlerts },
      collectionName,
      doc,
      onSuccess = ({ _id }) => gotoRoute(routeUtils.getEditRoute(collectionName).name, { _id }),
    ) {
      const handleCallback = (
        (Alerts.handleCallback && Alerts.handleCallback.bind(Alerts)) ||
        FallbackAlerts.handleCallback.bind(FallbackAlerts)
      );
      methods[collectionName].create.call(doc,
        handleCallback('admin.create', { props: () => ({ collectionName, doc }) }, (error, _id) => {
          if (!error) {
            onSuccess({ collectionName, _id });
          }
        }),
    );
    },
    destroy(
      { adminContext: { methods, gotoRoute }, Alerts = FallbackAlerts },
      collectionName, _id,
      onSuccess = () => gotoRoute(routeUtils.getListRoute(collectionName).name),
    ) {
      /* eslint no-alert: 0*/
      const confirmed = window.confirm("Really destroy? This can't be undone");
      const handleCallback = (
        (Alerts.handleCallback && Alerts.handleCallback.bind(Alerts)) ||
        FallbackAlerts.handleCallback.bind(FallbackAlerts)
      );
      if (confirmed) {
        methods[collectionName].destroy.call({ _id },
          handleCallback('admin.destroy', { props: () => ({ collectionName, _id }) }, (error) => {
            if (!error) {
              onSuccess({ collectionName, _id });
            }
          }),
      );
      }
    },
    exportCsv(
      { adminContext: { methods }, Alerts = FallbackAlerts },
      docs, { filename = 'export.csv', fieldsToExport = [], ...options } = {},
    ) {
      const isEmptyObject = (
        field => _.isObject(field) && !_.isDate(field) && _.isEmpty(field)
      );
      const isFieldToExport = (
        (val, key) => _.indexOf(fieldsToExport, key) >= 0
      );
      const removeEmptyObjects = doc => _.omitBy(doc, isEmptyObject);
      const pickFieldsToExport = doc => fieldsToExport.length > 0 && _.pickBy(doc, isFieldToExport);
      const transform = flow(
        map(flat),
        map(pickFieldsToExport),
        map(removeEmptyObjects),
      );
      const data = transform(docs);
      const keysSet = new Set();
      data.forEach(entry => _.keys(entry).forEach(key => keysSet.add(key)));
      const keys = [...keysSet.values()];

      csv.exportAsCsv({ filename, data, keys, ...options });
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
