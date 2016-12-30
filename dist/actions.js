'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Set = require('babel-runtime/core-js/set')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _papaparse = require('papaparse');

var _papaparse2 = _interopRequireDefault(_papaparse);

var _flat = require('flat');

var _flat2 = _interopRequireDefault(_flat);

var _utilsRoute_utils = require('./utils/route_utils');

var _utilsRoute_utils2 = _interopRequireDefault(_utilsRoute_utils);

var _utilsCsv = require('./utils/csv');

var _utilsCsv2 = _interopRequireDefault(_utilsCsv);

exports['default'] = {
  manulAdmin: {
    update: function update(_ref, collectionName, doc) {
      var _ref$adminContext = _ref.adminContext;
      var methods = _ref$adminContext.methods;
      var gotoRoute = _ref$adminContext.gotoRoute;
      var _ref$adminContext$showError = _ref$adminContext.showError;
      var showError = _ref$adminContext$showError === undefined ? _lodash2['default'].noop : _ref$adminContext$showError;
      var _ref$adminContext$showSuccess = _ref$adminContext.showSuccess;
      var showSuccess = _ref$adminContext$showSuccess === undefined ? _lodash2['default'].noop : _ref$adminContext$showSuccess;

      methods[collectionName].update.call(doc, function (error) {
        if (error) {
          showError(error);
        } else {
          showSuccess('Update successfull');
          gotoRoute(_utilsRoute_utils2['default'].getListRoute(collectionName).name);
        }
      });
    },
    create: function create(_ref2, collectionName, doc) {
      var _ref2$adminContext = _ref2.adminContext;
      var methods = _ref2$adminContext.methods;
      var gotoRoute = _ref2$adminContext.gotoRoute;
      var _ref2$adminContext$showError = _ref2$adminContext.showError;
      var showError = _ref2$adminContext$showError === undefined ? _lodash2['default'].noop : _ref2$adminContext$showError;
      var _ref2$adminContext$showSuccess = _ref2$adminContext.showSuccess;
      var showSuccess = _ref2$adminContext$showSuccess === undefined ? _lodash2['default'].noop : _ref2$adminContext$showSuccess;

      methods[collectionName].create.call(doc, function (error, _id) {
        if (error) {
          showError(error);
        } else {
          showSuccess('Create successfull');
          gotoRoute(_utilsRoute_utils2['default'].getEditRoute(collectionName).name, { _id: _id });
        }
      });
    },
    destroy: function destroy(_ref3, collectionName, _id) {
      var _ref3$adminContext = _ref3.adminContext;
      var methods = _ref3$adminContext.methods;
      var gotoRoute = _ref3$adminContext.gotoRoute;
      var _ref3$adminContext$showError = _ref3$adminContext.showError;
      var showError = _ref3$adminContext$showError === undefined ? _lodash2['default'].noop : _ref3$adminContext$showError;
      var _ref3$adminContext$showSuccess = _ref3$adminContext.showSuccess;
      var showSuccess = _ref3$adminContext$showSuccess === undefined ? _lodash2['default'].noop : _ref3$adminContext$showSuccess;

      /* eslint no-alert: 0*/
      var confirmed = window.confirm("Really destroy? This can't be undone");
      if (confirmed) {
        methods[collectionName].destroy.call({ _id: _id }, function (error) {
          if (error) {
            showError(error);
          } else {
            showSuccess('Destroy successfull');
            gotoRoute(_utilsRoute_utils2['default'].getListRoute(collectionName).name);
          }
        });
      }
    },
    downloadCsv: function downloadCsv(_ref4, collectionName) {
      var _ref4$adminContext = _ref4.adminContext;
      var methods = _ref4$adminContext.methods;
      var _ref4$adminContext$showError = _ref4$adminContext.showError;
      var showError = _ref4$adminContext$showError === undefined ? _lodash2['default'].noop : _ref4$adminContext$showError;

      methods[collectionName]['export'].call({}, function (error, _ref5) {
        var data = _ref5.data;
        var keys = _ref5.keys;

        if (error) {
          showError(error);
        } else {
          _utilsCsv2['default'].exportAsCsv({ filename: 'export_' + collectionName, data: data, keys: keys });
        }
      });
    },
    importCsv: function importCsv(_ref6, _ref7) {
      var methods = _ref6.adminContext.methods;
      var collectionName = _ref7.collectionName;
      var file = _ref7.file;
      var _ref7$onInsert = _ref7.onInsert;
      var onInsert = _ref7$onInsert === undefined ? _lodash2['default'].noop : _ref7$onInsert;
      var _ref7$onUpdate = _ref7.onUpdate;
      var onUpdate = _ref7$onUpdate === undefined ? _lodash2['default'].noop : _ref7$onUpdate;
      var _ref7$onComplete = _ref7.onComplete;
      var onComplete = _ref7$onComplete === undefined ? _lodash2['default'].noop : _ref7$onComplete;

      var counter = -1;
      var imported = new _Set();
      _papaparse2['default'].parse(file, {
        header: true,
        dynamicTyping: true,
        complete: function complete(_ref8) {
          var data = _ref8.data;

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