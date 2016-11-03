import _ from 'lodash';
import routeUtils from './utils/route_utils';
import Papa from 'papaparse';
import flat from 'flat';

export default {
  manulAdmin: {
    update({ adminContext: { methods, gotoRoute, showError = _.noop, showSuccess = _.noop } }, collectionName, doc) {
      methods[collectionName].update.call(doc, (error) => {
        if (error) {
          showError(error);
        } else {
          showSuccess('Update successfull');
          gotoRoute(routeUtils.getListRoute(collectionName).name);
        }
      });
    },
    create({ adminContext: { methods, gotoRoute, showError = _.noop, showSuccess = _.noop } }, collectionName, doc) {
      methods[collectionName].create.call(doc, (error, _id) => {
        if (error) {
          showError(error);
        } else {
          showSuccess('Create successfull');
          gotoRoute(routeUtils.getEditRoute(collectionName).name, { _id });
        }
      });
    },
    destroy({ adminContext: { methods, gotoRoute, showError = _.noop, showSuccess = _.noop } }, collectionName, _id) {
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
    downloadCsv({ adminContext: { methods, showError = _.noop } }, collectionName) {
      methods[collectionName].export.call({}, (error, { data, keys }) => {
        if (error) {
          showError(error);
        } else {
          // console.log(data, keys);
          // we encode missing values with "NULL"
          // because CSV has no concept of null/missing values
          // good read: http://www.garretwilson.com/blog/2009/04/23/csvnull.xhtml
          const defaults = _.zipObject(keys, keys.map(() => 'NULL'));
          // console.log(defaults);
          const dataPadded = data.map(entry => ({ ...defaults, ...entry }));
          // console.log(dataPadded);
          const csv = Papa.unparse(dataPadded);
          const blob = new Blob([csv]);
          const a = window.document.createElement('a');
          a.href = window.URL.createObjectURL(blob, { type: 'text/plain' });
          a.download = `export_${collectionName}.csv`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      });
    },
    importCsv({ adminContext: { methods } }, { collectionName, file, onInsert = _.noop, onUpdate = _.noop, onComplete = _.noop }) {
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
              _.omitBy(entryUncleaned, value => value === 'NULL')
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
