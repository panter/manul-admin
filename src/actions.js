import _ from 'lodash';
import Papa from 'papaparse';
import flat from 'flat';
import routeUtils from './utils/route_utils';
import csv from './utils/csv';

export default {
  manulAdmin: {
    update(
      { adminContext: { methods, gotoRoute, showError = _.noop, showSuccess = _.noop } },
      collectionName, doc,
    ) {
      methods[collectionName].update.call(doc, (error) => {
        if (error) {
          showError(error);
        } else {
          showSuccess('Update successfull');
          gotoRoute(routeUtils.getListRoute(collectionName).name);
        }
      });
    },
    create(
      { adminContext: { methods, gotoRoute, showError = _.noop, showSuccess = _.noop } },
      collectionName, doc,
    ) {
      methods[collectionName].create.call(doc, (error, _id) => {
        if (error) {
          showError(error);
        } else {
          showSuccess('Create successfull');
          gotoRoute(routeUtils.getEditRoute(collectionName).name, { _id });
        }
      });
    },
    destroy(
      { adminContext: { methods, gotoRoute, showError = _.noop, showSuccess = _.noop } },
      collectionName, _id,
    ) {
      /* eslint no-alert: 0*/
      const confirmed = window.confirm("Really destroy? This can't be undone");
      if (confirmed) {
        methods[collectionName].destroy.call({ _id }, (error) => {
          if (error) {
            showError(error);
          } else {
            showSuccess('Destroy successfull');
            gotoRoute(routeUtils.getListRoute(collectionName).name);
          }
        });
      }
    },
    downloadCsv(
      { adminContext: { methods, showError = _.noop } },
      collectionName,
    ) {
      methods[collectionName].export.call({}, (error, { data, keys }) => {
        if (error) {
          showError(error);
        } else {
          csv.exportAsCsv({ filename: `export_${collectionName}`, data, keys });
        }
      });
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
