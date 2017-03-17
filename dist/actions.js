'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _omitBy2 = require('lodash/omitBy');

var _omitBy3 = _interopRequireDefault(_omitBy2);

var _noop2 = require('lodash/noop');

var _noop3 = _interopRequireDefault(_noop2);

var _without2 = require('lodash/without');

var _without3 = _interopRequireDefault(_without2);

var _find2 = require('lodash/find');

var _find3 = _interopRequireDefault(_find2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _papaparse = require('papaparse');

var _papaparse2 = _interopRequireDefault(_papaparse);

var _flat = require('flat');

var _flat2 = _interopRequireDefault(_flat);

var _fallback_alerts = require('./fallback_alerts');

var _fallback_alerts2 = _interopRequireDefault(_fallback_alerts);

var _csv = require('./utils/csv');

var _csv2 = _interopRequireDefault(_csv);

var _route_utils = require('./utils/route_utils');

var _route_utils2 = _interopRequireDefault(_route_utils);

var _local_state_utils = require('./utils/local_state_utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = {
  manulAdmin: {
    gotoCreate: function gotoCreate(_ref, collectionName) {
      var gotoRoute = _ref.adminContext.gotoRoute;

      gotoRoute(_route_utils2.default.getCreateRoute(collectionName).name);
    },
    gotoEdit: function gotoEdit(_ref2, collectionName, _id) {
      var gotoRoute = _ref2.adminContext.gotoRoute;

      gotoRoute(_route_utils2.default.getEditRoute(collectionName).name, { _id: _id });
    },
    gotoList: function gotoList(_ref3, collectionName) {
      var gotoRoute = _ref3.adminContext.gotoRoute;

      gotoRoute(_route_utils2.default.getListRoute(collectionName).name);
    },

    // sortProperty is according to react-griddle
    listSortToggle: function listSortToggle(_ref4, collectionName, newSortProperty) {
      var LocalState = _ref4.LocalState;

      var localStateSortProperties = (0, _local_state_utils.stateListSort)(collectionName);
      var sortProperties = LocalState.get(localStateSortProperties) || [];
      var oldProperty = (0, _find3.default)(sortProperties, function (s) {
        return s.id === newSortProperty.id;
      });
      var newSortProps = [];

      if (!oldProperty) {
        newSortProps = [_extends({}, newSortProperty, { sortAscending: true })].concat(_toConsumableArray(sortProperties));
      } else {
        newSortProps = (0, _without3.default)(sortProperties, oldProperty);
        if (oldProperty.sortAscending) {
          newSortProps = [_extends({}, newSortProperty, { sortAscending: false })].concat(_toConsumableArray(newSortProps));
        }
      }
      LocalState.set(localStateSortProperties, newSortProps);
    },
    listSetSort: function listSetSort(_ref5, collectionName, sortProperties) {
      var LocalState = _ref5.LocalState;

      LocalState.set((0, _local_state_utils.stateListSort)(collectionName), sortProperties);
    },
    listSetFilter: function listSetFilter(_ref6, collectionName, filter) {
      var LocalState = _ref6.LocalState;

      LocalState.set((0, _local_state_utils.stateListFilter)(collectionName), filter);
    },
    listSetPageProperties: function listSetPageProperties(_ref7, collectionName, pageProperties) {
      var LocalState = _ref7.LocalState;

      LocalState.set((0, _local_state_utils.statePageProperties)(collectionName), pageProperties);
    },
    listGotoPage: function listGotoPage(_ref8, collectionName, currentPage) {
      var LocalState = _ref8.LocalState;

      var pageProperties = LocalState.get((0, _local_state_utils.statePageProperties)(collectionName));
      LocalState.set((0, _local_state_utils.statePageProperties)(collectionName), _extends({}, pageProperties, { currentPage: currentPage }));
    },
    listGotoNextPage: function listGotoNextPage(_ref9, collectionName) {
      var LocalState = _ref9.LocalState;

      var pageProperties = LocalState.get((0, _local_state_utils.statePageProperties)(collectionName));
      LocalState.set((0, _local_state_utils.statePageProperties)(collectionName), _extends({}, pageProperties, { currentPage: pageProperties.currentPage + 1 }));
    },
    listGotoPreviousPage: function listGotoPreviousPage(_ref10, collectionName) {
      var LocalState = _ref10.LocalState;

      var pageProperties = LocalState.get((0, _local_state_utils.statePageProperties)(collectionName));
      LocalState.set((0, _local_state_utils.statePageProperties)(collectionName), _extends({}, pageProperties, { currentPage: pageProperties.currentPage - 1 }));
    },
    update: function update(_ref11, collectionName, doc) {
      var _ref11$adminContext = _ref11.adminContext,
          methods = _ref11$adminContext.methods,
          gotoRoute = _ref11$adminContext.gotoRoute,
          _ref11$Alerts = _ref11.Alerts,
          Alerts = _ref11$Alerts === undefined ? _fallback_alerts2.default : _ref11$Alerts;

      methods[collectionName].update.call(doc, Alerts.handleCallback('admin.update', { props: function props() {
          return { collectionName: collectionName, doc: doc };
        } }, function (error) {
        if (!error) {
          gotoRoute(_route_utils2.default.getListRoute(collectionName).name);
        }
      }));
    },
    create: function create(_ref12, collectionName, doc) {
      var _ref12$adminContext = _ref12.adminContext,
          methods = _ref12$adminContext.methods,
          gotoRoute = _ref12$adminContext.gotoRoute,
          _ref12$Alerts = _ref12.Alerts,
          Alerts = _ref12$Alerts === undefined ? _fallback_alerts2.default : _ref12$Alerts;

      methods[collectionName].create.call(doc, Alerts.handleCallback('admin.create', { props: function props() {
          return { collectionName: collectionName, doc: doc };
        } }, function (error, _id) {
        if (!error) {
          gotoRoute(_route_utils2.default.getEditRoute(collectionName).name, { _id: _id });
        }
      }));
    },
    destroy: function destroy(_ref13, collectionName, _id) {
      var _ref13$adminContext = _ref13.adminContext,
          methods = _ref13$adminContext.methods,
          gotoRoute = _ref13$adminContext.gotoRoute,
          _ref13$Alerts = _ref13.Alerts,
          Alerts = _ref13$Alerts === undefined ? _fallback_alerts2.default : _ref13$Alerts;

      /* eslint no-alert: 0*/
      var confirmed = window.confirm("Really destroy? This can't be undone");
      if (confirmed) {
        methods[collectionName].destroy.call({ _id: _id }, Alerts.handleCallback('admin.destroy', { props: function props() {
            return { collectionName: collectionName, _id: _id };
          } }, function (error) {
          if (!error) {
            gotoRoute(_route_utils2.default.getListRoute(collectionName).name);
          }
        }));
      }
    },
    downloadCsv: function downloadCsv(_ref14, collectionName, options) {
      var methods = _ref14.adminContext.methods,
          _ref14$Alerts = _ref14.Alerts,
          Alerts = _ref14$Alerts === undefined ? _fallback_alerts2.default : _ref14$Alerts;

      methods[collectionName].export.call({}, Alerts.handleCallback('admin.export', { props: function props() {
          return { collectionName: collectionName };
        } }, function (error, _ref15) {
        var data = _ref15.data,
            keys = _ref15.keys;

        if (!error) {
          _csv2.default.exportAsCsv(_extends({ filename: 'export_' + collectionName, data: data, keys: keys }, options));
        }
      }));
    },
    importCsv: function importCsv(_ref16, _ref17) {
      var methods = _ref16.adminContext.methods;
      var collectionName = _ref17.collectionName,
          file = _ref17.file,
          _ref17$onInsert = _ref17.onInsert,
          onInsert = _ref17$onInsert === undefined ? _noop3.default : _ref17$onInsert,
          _ref17$onUpdate = _ref17.onUpdate,
          onUpdate = _ref17$onUpdate === undefined ? _noop3.default : _ref17$onUpdate,
          _ref17$onComplete = _ref17.onComplete,
          onComplete = _ref17$onComplete === undefined ? _noop3.default : _ref17$onComplete;

      var counter = -1;
      var imported = new Set();
      _papaparse2.default.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: function complete(_ref18) {
          var data = _ref18.data;

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
            var entry = _flat2.default.unflatten((0, _omitBy3.default)(entryUncleaned, function (value) {
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
//# sourceMappingURL=actions.js.map