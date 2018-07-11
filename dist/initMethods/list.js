'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _is_allowed = require('../is_allowed');

var _is_allowed2 = _interopRequireDefault(_is_allowed);

var _schemas = require('../schemas');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEBUG = false;

exports.default = function (context, collectionName, collectionConfig) {
  return new context.ValidatedMethod({
    name: 'manulAdmin.' + collectionName + '.list',
    validate: _schemas.ListSchema.validator({ clean: false }),
    run: function run(options) {
      if (!(0, _is_allowed2.default)(collectionName, this.userId)) {
        throw new context.Meteor.Error('not allowed', 'You are not allowed');
      }
      this.unblock();

      var _getListQueryAndOptio = (0, _utils.getListQueryAndOptions)(context, collectionName, collectionConfig, options),
          query = _getListQueryAndOptio.query,
          queryOptions = _getListQueryAndOptio.queryOptions;

      if (DEBUG) console.time('docs');

      var docs = collectionConfig.collection.find(query, queryOptions).fetch();
      if (DEBUG) console.timeEnd('docs');
      if (DEBUG) console.time('count');
      var count = collectionConfig.collection.find(query).count();
      if (DEBUG) console.timeEnd('count');
      return {
        docs: docs,
        count: count
      };
    }
  });
};
//# sourceMappingURL=list.js.map