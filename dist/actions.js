'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

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

var _utilsLocal_state_utils = require('./utils/local_state_utils');

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
    // sortProperty is according to react-griddle
    listSortToggle: function listSortToggle(_ref4, collectionName, newSortProperty) {
      var LocalState = _ref4.LocalState;

      var localStateSortProperties = (0, _utilsLocal_state_utils.stateListSort)(collectionName);
      var sortProperties = LocalState.get(localStateSortProperties) || [];
      var oldProperty = _lodash2['default'].find(sortProperties, function (s) {
        return s.id === newSortProperty.id;
      });
      var newSortProps = [];

      if (!oldProperty) {
        newSortProps = [_extends({}, newSortProperty, { sortAscending: true })].concat(_toConsumableArray(sortProperties));
      } else {
        newSortProps = _lodash2['default'].without(sortProperties, oldProperty);
        if (oldProperty.sortAscending) {
          newSortProps = [_extends({}, newSortProperty, { sortAscending: false })].concat(_toConsumableArray(newSortProps));
        }
      }
      LocalState.set(localStateSortProperties, newSortProps);
    },
    listSetSort: function listSetSort(_ref5, collectionName, sortProperties) {
      var LocalState = _ref5.LocalState;

      LocalState.set((0, _utilsLocal_state_utils.stateListSort)(collectionName), sortProperties);
    },
    listSetFilter: function listSetFilter(_ref6, collectionName, filter) {
      var LocalState = _ref6.LocalState;

      LocalState.set((0, _utilsLocal_state_utils.stateListFilter)(collectionName), filter);
    },
    listSetPageProperties: function listSetPageProperties(_ref7, collectionName, pageProperties) {
      var LocalState = _ref7.LocalState;

      LocalState.set((0, _utilsLocal_state_utils.statePageProperties)(collectionName), pageProperties);
    },
    update: function update(_ref8, collectionName, doc) {
      var _ref8$adminContext = _ref8.adminContext;
      var methods = _ref8$adminContext.methods;
      var gotoRoute = _ref8$adminContext.gotoRoute;
      var _ref8$Alerts = _ref8.Alerts;
      var Alerts = _ref8$Alerts === undefined ? _fallback_alerts2['default'] : _ref8$Alerts;

      methods[collectionName].update.call(doc, Alerts.handleCallback('admin.update', { props: function props() {
          return { collectionName: collectionName, doc: doc };
        } }, function (error) {
        if (!error) {
          gotoRoute(_utilsRoute_utils2['default'].getListRoute(collectionName).name);
        }
      }));
    },
    create: function create(_ref9, collectionName, doc) {
      var _ref9$adminContext = _ref9.adminContext;
      var methods = _ref9$adminContext.methods;
      var gotoRoute = _ref9$adminContext.gotoRoute;
      var _ref9$Alerts = _ref9.Alerts;
      var Alerts = _ref9$Alerts === undefined ? _fallback_alerts2['default'] : _ref9$Alerts;

      methods[collectionName].create.call(doc, Alerts.handleCallback('admin.create', { props: function props() {
          return { collectionName: collectionName, doc: doc };
        } }, function (error, _id) {
        if (!error) {
          gotoRoute(_utilsRoute_utils2['default'].getEditRoute(collectionName).name, { _id: _id });
        }
      }));
    },
    destroy: function destroy(_ref10, collectionName, _id) {
      var _ref10$adminContext = _ref10.adminContext;
      var methods = _ref10$adminContext.methods;
      var gotoRoute = _ref10$adminContext.gotoRoute;
      var _ref10$Alerts = _ref10.Alerts;
      var Alerts = _ref10$Alerts === undefined ? _fallback_alerts2['default'] : _ref10$Alerts;

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
    downloadCsv: function downloadCsv(_ref11, collectionName, options) {
      var methods = _ref11.adminContext.methods;
      var _ref11$Alerts = _ref11.Alerts;
      var Alerts = _ref11$Alerts === undefined ? _fallback_alerts2['default'] : _ref11$Alerts;

      methods[collectionName]['export'].call({}, Alerts.handleCallback('admin.export', { props: function props() {
          return { collectionName: collectionName };
        } }, function (error, _ref12) {
        var data = _ref12.data;
        var keys = _ref12.keys;

        if (!error) {
          _utilsCsv2['default'].exportAsCsv(_extends({ filename: 'export_' + collectionName, data: data, keys: keys }, options));
        }
      }));
    },
    importCsv: function importCsv(_ref13, _ref14) {
      var methods = _ref13.adminContext.methods;
      var collectionName = _ref14.collectionName;
      var file = _ref14.file;
      var _ref14$onInsert = _ref14.onInsert;
      var onInsert = _ref14$onInsert === undefined ? _lodash2['default'].noop : _ref14$onInsert;
      var _ref14$onUpdate = _ref14.onUpdate;
      var onUpdate = _ref14$onUpdate === undefined ? _lodash2['default'].noop : _ref14$onUpdate;
      var _ref14$onComplete = _ref14.onComplete;
      var onComplete = _ref14$onComplete === undefined ? _lodash2['default'].noop : _ref14$onComplete;

      var counter = -1;
      var imported = new _Set();
      _papaparse2['default'].parse(file, {
        header: true,
        dynamicTyping: true,
        complete: function complete(_ref15) {
          var data = _ref15.data;

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