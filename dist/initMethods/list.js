'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _is_allowed = require('../is_allowed');

var _is_allowed2 = _interopRequireDefault(_is_allowed);

var _schemas = require('../schemas');

var _getListResult = require('./getListResult');

var _getListResult2 = _interopRequireDefault(_getListResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// use Promise from meteor package
/* global Package */
var Promise = Package.promise.Promise;
// TODO: remove meteor from context and take it from Package

exports.default = function (context, collectionName, collectionConfig) {
  return new context.ValidatedMethod({
    name: 'manulAdmin.' + collectionName + '.list',
    validate: _schemas.ListSchema.validator({ clean: false }),
    run: function run(listOptions) {
      if (!(0, _is_allowed2.default)(collectionName, this.userId)) {
        throw new context.Meteor.Error('not allowed', 'You are not allowed');
      }
      if (context.Meteor.isClient) {
        return { docs: [], count: 0 };
      }
      this.unblock();

      var _Promise$await = Promise.await((0, _getListResult2.default)({
        context: context,
        collectionConfig: collectionConfig,
        collectionName: collectionName,
        listOptions: listOptions
      })),
          docs = _Promise$await.docs,
          count = _Promise$await.count;

      return {
        docs: docs,
        count: count
      };
    }
  });
};
//# sourceMappingURL=list.js.map