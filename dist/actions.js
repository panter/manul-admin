'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Set = require('babel-runtime/core-js/set')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _papaparse = require('papaparse');

var _papaparse2 = _interopRequireDefault(_papaparse);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _flat = require('flat');

var _flat2 = _interopRequireDefault(_flat);

var _fallback_alerts = require('./fallback_alerts');

var _fallback_alerts2 = _interopRequireDefault(_fallback_alerts);

var _utilsCsv = require('./utils/csv');

var _utilsCsv2 = _interopRequireDefault(_utilsCsv);

var _utilsRoute_utils = require('./utils/route_utils');

var _utilsRoute_utils2 = _interopRequireDefault(_utilsRoute_utils);

exports['default'] = {
  manulAdmin: {
    gotoCreate: function gotoCreate(_ref, collectionName) {
      var gotoRoute = _ref.adminContext.gotoRoute;

      gotoRoute(_utilsRoute_utils2['default'].getCreateRoute(collectionName).name);
    },
    gotoEdit: function gotoEdit(_ref2, collectionName, _id) {
      var gotoRoute = _ref2.adminContext.gotoRoute;

      gotoRoute(_utilsRoute_utils2['default'].getEditRoute(collectionName).name, { _id: _id });
    },
    gotoList: function gotoList(_ref3, collectionName) {
      var gotoRoute = _ref3.adminContext.gotoRoute;

      gotoRoute(_utilsRoute_utils2['default'].getListRoute(collectionName).name);
    },
    update: function update(_ref4, collectionName, doc) {
      var _ref4$adminContext = _ref4.adminContext;
      var methods = _ref4$adminContext.methods;
      var gotoRoute = _ref4$adminContext.gotoRoute;
      var _ref4$Alerts = _ref4.Alerts;
      var Alerts = _ref4$Alerts === undefined ? _fallback_alerts2['default'] : _ref4$Alerts;

      methods[collectionName].update.call(doc, Alerts.handleCallback('admin.update', { props: function props() {
          return { collectionName: collectionName, doc: doc };
        } }, function (error) {
        if (!error) {
          gotoRoute(_utilsRoute_utils2['default'].getListRoute(collectionName).name);
        }
      }));
    },
    create: function create(_ref5, collectionName, doc) {
      var _ref5$adminContext = _ref5.adminContext;
      var methods = _ref5$adminContext.methods;
      var gotoRoute = _ref5$adminContext.gotoRoute;
      var _ref5$Alerts = _ref5.Alerts;
      var Alerts = _ref5$Alerts === undefined ? _fallback_alerts2['default'] : _ref5$Alerts;

      methods[collectionName].create.call(doc, Alerts.handleCallback('admin.create', { props: function props() {
          return { collectionName: collectionName, doc: doc };
        } }, function (error, _id) {
        if (!error) {
          gotoRoute(_utilsRoute_utils2['default'].getEditRoute(collectionName).name, { _id: _id });
        }
      }));
    },
    destroy: function destroy(_ref6, collectionName, _id) {
      var _ref6$adminContext = _ref6.adminContext;
      var methods = _ref6$adminContext.methods;
      var gotoRoute = _ref6$adminContext.gotoRoute;
      var _ref6$Alerts = _ref6.Alerts;
      var Alerts = _ref6$Alerts === undefined ? _fallback_alerts2['default'] : _ref6$Alerts;

      /* eslint no-alert: 0*/
      var confirmed = window.confirm("Really destroy? This can't be undone");
      if (confirmed) {
        methods[collectionName].destroy.call({ _id: _id }, Alerts.handleCallback('admin.destroy', { props: function props() {
            return { collectionName: collectionName, _id: _id };
          } }, function (error) {
          if (!error) {
            gotoRoute(_utilsRoute_utils2['default'].getListRoute(collectionName).name);
          }
        }));
      }
    },
    downloadCsv: function downloadCsv(_ref7, collectionName, options) {
      var methods = _ref7.adminContext.methods;
      var _ref7$Alerts = _ref7.Alerts;
      var Alerts = _ref7$Alerts === undefined ? _fallback_alerts2['default'] : _ref7$Alerts;

      methods[collectionName]['export'].call({}, Alerts.handleCallback('admin.export', { props: function props() {
          return { collectionName: collectionName };
        } }, function (error, _ref8) {
        var data = _ref8.data;
        var keys = _ref8.keys;

        if (!error) {
          _utilsCsv2['default'].exportAsCsv(_extends({ filename: 'export_' + collectionName, data: data, keys: keys }, options));
        }
      }));
    },
    importCsv: function importCsv(_ref9, _ref10) {
      var methods = _ref9.adminContext.methods;
      var collectionName = _ref10.collectionName;
      var file = _ref10.file;
      var _ref10$onInsert = _ref10.onInsert;
      var onInsert = _ref10$onInsert === undefined ? _lodash2['default'].noop : _ref10$onInsert;
      var _ref10$onUpdate = _ref10.onUpdate;
      var onUpdate = _ref10$onUpdate === undefined ? _lodash2['default'].noop : _ref10$onUpdate;
      var _ref10$onComplete = _ref10.onComplete;
      var onComplete = _ref10$onComplete === undefined ? _lodash2['default'].noop : _ref10$onComplete;

      var counter = -1;
      var imported = new _Set();
      _papaparse2['default'].parse(file, {
        header: true,
        dynamicTyping: true,
        complete: function complete(_ref11) {
          var data = _ref11.data;

          data.forEach(function (entryUncleaned) {
            counter += 1;
            var index = counter; // need constant closure copy
            var checkForComplete = function checkForComplete() {
              imported.add(index);
              if (imported.size === data.length) {
                onComplete();
              }
            };
            // console.log('uncleaned', entryUncleaned);
            var entry = _flat2['default'].unflatten(_lodash2['default'].omitBy(entryUncleaned, function (value) {
              return value === 'NULL';
            }));
            // console.log('cleaned', entry);
            if (entry._id) {
              methods[collectionName].update.call(entry, function (error) {
                onUpdate(index, error, entry);
                checkForComplete();
              });
            } else {
              delete entry._id; // if falsy
              methods[collectionName].create.call(entry, function (error, _id) {
                onInsert(index, error, _extends({ _id: _id }, entry));
                checkForComplete();
              });
            }
          });
        }
      });
    }
  }
};
module.exports = exports['default'];
//# sourceMappingURL=actions.js.map