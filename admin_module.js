

import _ from 'lodash';
import AdminMethods from './methods';
import Routes from './routes';
import routeUtils from './route_utils';
import Papa from 'papaparse';
export default (adminConfig) => {
  const routes = Routes(adminConfig);
  const methods = AdminMethods(adminConfig);
  const actions = {
    manulAdmin: {
      update({adminContext: {gotoRoute, Methods, showError = _.noop, showSuccess = _.noop}}, collectionName, doc) {
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
      create({adminContext: {gotoRoute, Methods, showError = _.noop, showSuccess = _.noop}}, collectionName, doc) {
        methods[collectionName].create.call(doc, (error, _id) => {
          if (error) {
            showError(error);
          } else {
            if (adminConfig.hooks && adminConfig.hooks[collectionName] && adminConfig.hooks[collectionName].postCreate) {
              adminConfig.hooks[collectionName].postCreate({ Methods }, _id);
            }
            showSuccess('Create successfull');
            gotoRoute(routeUtils.getEditRoute(collectionName).name, {_id});
          }

        });
      },
      downloadCsv({adminContext: {showError = _.noop}}, collectionName) {
        methods[collectionName].export.call({}, (error, data) => {
          if (error) {
            showError(error);
          } else {
            const csv = Papa.unparse(data);
            const blob = new Blob([ csv ]);
            const a = window.document.createElement('a');
            a.href = window.URL.createObjectURL(blob, {type: 'text/plain'});
            a.download = `export_${collectionName}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
        });
      }
    }
  }
  const load = ({adminContext}) => {
    if (!adminContext) {
      throw new Error('Please provide a adminContext-object in your mantra-context');
    }

  }



  return {routes, actions, load}

}
