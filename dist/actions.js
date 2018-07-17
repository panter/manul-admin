'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _omitBy2 = require('lodash/omitBy');

var _omitBy3 = _interopRequireDefault(_omitBy2);

var _noop2 = require('lodash/noop');

var _noop3 = _interopRequireDefault(_noop2);

var _without2 = require('lodash/without');

var _without3 = _interopRequireDefault(_without2);

var _find2 = require('lodash/fp/find');

var _find3 = _interopRequireDefault(_find2);

var _papaparse = require('papaparse');

var _papaparse2 = _interopRequireDefault(_papaparse);

var _flat = require('flat');

var _flat2 = _interopRequireDefault(_flat);

var _local_state_utils = require('./utils/local_state_utils');

var _fallback_alerts = require('./fallback_alerts');

var _fallback_alerts2 = _interopRequireDefault(_fallback_alerts);

var _csv = require('./utils/csv');

var _csv2 = _interopRequireDefault(_csv);

var _route_utils = require('./utils/route_utils');

var _route_utils2 = _interopRequireDefault(_route_utils);

var _column_utils = require('./utils/column_utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      var oldProperty = (0, _find3.default)(function (s) {
        return s.id === newSortProperty.id;
      })(sortProperties);
      var newSortProps = [];

      if (!oldProperty) {
        newSortProps = [(0, _extends3.default)({}, newSortProperty, { sortAscending: true })];
      } else {
        newSortProps = (0, _without3.default)(sortProperties, oldProperty);
        if (oldProperty.sortAscending) {
          newSortProps = [(0, _extends3.default)({}, newSortProperty, { sortAscending: false })];
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
    listSetSearchTerm: function listSetSearchTerm(_ref7, collectionName, searchTerm) {
      var LocalState = _ref7.LocalState;

      // reset pagination if changed
      var pageProperties = LocalState.get((0, _local_state_utils.statePageProperties)(collectionName));
      LocalState.set((0, _local_state_utils.statePageProperties)(collectionName), (0, _extends3.default)({}, pageProperties, {
        currentPage: 1
      }));
      LocalState.set((0, _local_state_utils.stateListSearch)(collectionName), searchTerm);
    },
    listSetPageProperties: function listSetPageProperties(_ref8, collectionName, pageProperties) {
      var LocalState = _ref8.LocalState;

      LocalState.set((0, _local_state_utils.statePageProperties)(collectionName), pageProperties);
    },
    listGotoPage: function listGotoPage(_ref9, collectionName, currentPage) {
      var LocalState = _ref9.LocalState;

      var pageProperties = LocalState.get((0, _local_state_utils.statePageProperties)(collectionName));
      LocalState.set((0, _local_state_utils.statePageProperties)(collectionName), (0, _extends3.default)({}, pageProperties, {
        currentPage: currentPage
      }));
    },
    listGotoNextPage: function listGotoNextPage(_ref10, collectionName) {
      var LocalState = _ref10.LocalState;

      var pageProperties = LocalState.get((0, _local_state_utils.statePageProperties)(collectionName));
      LocalState.set((0, _local_state_utils.statePageProperties)(collectionName), (0, _extends3.default)({}, pageProperties, {
        currentPage: pageProperties.currentPage + 1
      }));
    },
    listGotoPreviousPage: function listGotoPreviousPage(_ref11, collectionName) {
      var LocalState = _ref11.LocalState;

      var pageProperties = LocalState.get((0, _local_state_utils.statePageProperties)(collectionName));
      LocalState.set((0, _local_state_utils.statePageProperties)(collectionName), (0, _extends3.default)({}, pageProperties, {
        currentPage: pageProperties.currentPage - 1
      }));
    },
    update: function update(_ref12, collectionName, doc) {
      var _ref12$adminContext = _ref12.adminContext,
          methods = _ref12$adminContext.methods,
          gotoRoute = _ref12$adminContext.gotoRoute,
          _ref12$Alerts = _ref12.Alerts,
          Alerts = _ref12$Alerts === undefined ? _fallback_alerts2.default : _ref12$Alerts;
      var onSuccess = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {
        return gotoRoute(_route_utils2.default.getListRoute(collectionName).name);
      };

      var handleCallback = Alerts.handleCallback && Alerts.handleCallback.bind(Alerts) || _fallback_alerts2.default.handleCallback.bind(_fallback_alerts2.default);
      methods[collectionName].update.call(doc, handleCallback('admin.update', { props: function props() {
          return { collectionName: collectionName, doc: doc };
        } }, function (error) {
        if (!error) {
          onSuccess({ collectionName: collectionName, doc: doc, _id: doc._id });
        }
      }));
    },
    create: function create(_ref13, collectionName, doc) {
      var _ref13$adminContext = _ref13.adminContext,
          methods = _ref13$adminContext.methods,
          gotoRoute = _ref13$adminContext.gotoRoute,
          _ref13$Alerts = _ref13.Alerts,
          Alerts = _ref13$Alerts === undefined ? _fallback_alerts2.default : _ref13$Alerts;
      var onSuccess = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (_ref14) {
        var _id = _ref14._id;
        return gotoRoute(_route_utils2.default.getEditRoute(collectionName).name, { _id: _id });
      };

      var handleCallback = Alerts.handleCallback && Alerts.handleCallback.bind(Alerts) || _fallback_alerts2.default.handleCallback.bind(_fallback_alerts2.default);
      methods[collectionName].create.call(doc, handleCallback('admin.create', { props: function props() {
          return { collectionName: collectionName, doc: doc };
        } }, function (error, _id) {
        if (!error) {
          onSuccess({ collectionName: collectionName, _id: _id });
        }
      }));
    },
    destroy: function destroy(_ref15, collectionName, _id) {
      var _ref15$adminContext = _ref15.adminContext,
          methods = _ref15$adminContext.methods,
          gotoRoute = _ref15$adminContext.gotoRoute,
          _ref15$Alerts = _ref15.Alerts,
          Alerts = _ref15$Alerts === undefined ? _fallback_alerts2.default : _ref15$Alerts;
      var onSuccess = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {
        return gotoRoute(_route_utils2.default.getListRoute(collectionName).name);
      };

      /* eslint no-alert: 0*/
      var confirmed = window.confirm("Really destroy? This can't be undone");
      var handleCallback = Alerts.handleCallback && Alerts.handleCallback.bind(Alerts) || _fallback_alerts2.default.handleCallback.bind(_fallback_alerts2.default);
      if (confirmed) {
        methods[collectionName].destroy.call({ _id: _id }, handleCallback('admin.destroy', { props: function props() {
            return { collectionName: collectionName, _id: _id };
          } }, function (error) {
          if (!error) {
            onSuccess({ collectionName: collectionName, _id: _id });
          }
        }));
      }
    },
    exportCsv: function exportCsv(_ref17, _ref18) {
      var i18n = _ref17.i18n,
          _ref17$adminContext = _ref17.adminContext,
          methods = _ref17$adminContext.methods,
          config = _ref17$adminContext.config,
          _ref17$Alerts = _ref17.Alerts,
          Alerts = _ref17$Alerts === undefined ? _fallback_alerts2.default : _ref17$Alerts;
      var collectionName = _ref18.collectionName,
          filter = _ref18.filter,
          searchTerm = _ref18.searchTerm,
          sortProperties = _ref18.sortProperties;

      var _ref16 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var _ref16$filename = _ref16.filename,
          filename = _ref16$filename === undefined ? 'export.csv' : _ref16$filename,
          onProgress = _ref16.onProgress,
          onCompleted = _ref16.onCompleted,
          options = (0, _objectWithoutProperties3.default)(_ref16, ['filename', 'onProgress', 'onCompleted']);

      var methodProps = {
        filter: filter,
        searchTerm: searchTerm,
        sortProperties: sortProperties
      };
      var collectionConfig = config.collections[collectionName];
      var columnsExport = (0, _column_utils.filterColumns)(collectionConfig.columns, 'export');
      methods[collectionName].listCount.call(methodProps, function (countError, totalCount) {
        var allDocs = [];
        if (countError) {
          console.error(countError);
        }

        var currentPage = 1;
        var pageSize = 1000;
        var _onExportCompleted = function _onExportCompleted() {
          _csv2.default.exportAsCsv((0, _extends3.default)({
            filename: filename,
            data: allDocs,
            keys: columnsExport.map(function (column) {
              return typeof column === 'string' ? column : column.id;
            }),
            nullValues: columnsExport.map(function (column) {
              return typeof column === 'string' ? '' : column.nullValue || '';
            }),
            transforms: columnsExport.map(function (column) {
              return column.transform || null;
            }),
            columnTitles: columnsExport.map(function (column) {
              return (0, _column_utils.getColumnTitleI18nKey)({
                collectionName: collectionName,
                collectionConfig: collectionConfig,
                column: column
              });
            }).map(function (k) {
              return i18n ? i18n.t([k + '.label', k]) : k;
            })

          }, options));
          if (onCompleted) onCompleted();
        };
        var _fetchChunk = function _fetchChunk() {
          var pageProperties = {
            currentPage: currentPage,
            pageSize: pageSize
          };
          methods[collectionName].list.call((0, _extends3.default)({}, methodProps, {
            pageProperties: pageProperties,
            listType: 'export'
          }), function (listError, result) {
            allDocs = [].concat((0, _toConsumableArray3.default)(allDocs), (0, _toConsumableArray3.default)(result.docs));
            var progress = allDocs.length / totalCount;
            if (onProgress) {
              onProgress(progress);
            }
            if (result.docs.length === 0 || allDocs.length >= totalCount) {
              _onExportCompleted();
            } else {
              currentPage += 1;
              _fetchChunk();
            }
          });
        };
        _fetchChunk();
      });
    },
    importCsv: function importCsv(_ref19, _ref20) {
      var methods = _ref19.adminContext.methods;
      var collectionName = _ref20.collectionName,
          file = _ref20.file,
          _ref20$onInsert = _ref20.onInsert,
          onInsert = _ref20$onInsert === undefined ? _noop3.default : _ref20$onInsert,
          _ref20$onUpdate = _ref20.onUpdate,
          onUpdate = _ref20$onUpdate === undefined ? _noop3.default : _ref20$onUpdate,
          _ref20$onComplete = _ref20.onComplete,
          onComplete = _ref20$onComplete === undefined ? _noop3.default : _ref20$onComplete;

      var counter = -1;
      var imported = new _set2.default();
      _papaparse2.default.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: function complete(_ref21) {
          var data = _ref21.data;

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
                onInsert(index, error, (0, _extends3.default)({ _id: _id }, entry));
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