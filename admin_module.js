

import _ from 'lodash';
import Methods from './methods';
import Routes from './routes';
import routeUtils from './route_utils';
import Papa from 'papaparse';
export default (adminConfig) => {
  const routes = Routes(adminConfig);
  const methods = Methods(adminConfig);
  const actions = {
    manulAdmin: {
      update({adminContext: {gotoRoute, showError = _.noop, showSuccess = _.noop}}, collectionName, doc) {
        methods[collectionName].update.call(doc, (error) => {
          if (error) {
            showError(error);
          } else {
            showSuccess('Update successfull');
            gotoRoute(routeUtils.getListRoute(collectionName).name);
          }

        });
      },
      create({adminContext: {gotoRoute, showError = _.noop, showSuccess = _.noop}}, collectionName, doc) {
        methods[collectionName].create.call(doc, (error, _id) => {
          if (error) {
            showError(error);
          } else {
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
