

import _ from 'lodash';
import AdminMethods from './methods';
import Routes from './routes';
import routeUtils from './route_utils';
import Papa from 'papaparse';
import flat from 'flat';

export default (adminConfig) => {
  const routes = Routes(adminConfig);
  const methods = AdminMethods(adminConfig);
  const actions = {
    manulAdmin: {
      update({ adminContext: { gotoRoute, Methods, showError = _.noop, showSuccess = _.noop } }, collectionName, doc) {
        methods[collectionName].update.call(doc, (error) => {
          if (error) {
            showError(error);
          } else {
            if (adminConfig.hooks && adminConfig.hooks[collectionName] && adminConfig.hooks[collectionName].postUpdate) {
              adminConfig.hooks[collectionName].postUpdate({ Methods }, doc._id);
            }
            showSuccess('Update successfull');
            gotoRoute(routeUtils.getListRoute(collectionName).name);
          }
        });
      },
      create({ adminContext: { gotoRoute, Methods, showError = _.noop, showSuccess = _.noop } }, collectionName, doc) {
        methods[collectionName].create.call(doc, (error, _id) => {
          if (error) {
            showError(error);
          } else {
            if (adminConfig.hooks && adminConfig.hooks[collectionName] && adminConfig.hooks[collectionName].postCreate) {
              adminConfig.hooks[collectionName].postCreate({ Methods }, _id);
            }
            showSuccess('Create successfull');
            gotoRoute(routeUtils.getEditRoute(collectionName).name, { _id });
          }
        });
      },
      downloadCsv({ adminContext: { showError = _.noop } }, collectionName) {
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
      importCsv({ adminContext }, { collectionName, file, onInsert = _.noop, onUpdate = _.noop, onComplete = _.noop }) {
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
  const load = ({ adminContext }) => {
    if (!adminContext) {
      throw new Error('Please provide a adminContext-object in your mantra-context');
    }
  };


  return { routes, actions, load };
};
