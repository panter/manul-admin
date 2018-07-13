'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _is_allowed = require('../is_allowed');

var _is_allowed2 = _interopRequireDefault(_is_allowed);

var _schemas = require('../schemas');

var _getListResult2 = require('./getListResult');

var _getListResult3 = _interopRequireDefault(_getListResult2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (context, collectionName, collectionConfig) {
  return new context.ValidatedMethod({
    name: 'manulAdmin.' + collectionName + '.listCount',
    validate: _schemas.ListSchema.validator({ clean: false }),
    run: function run(listOptions) {
      if (!(0, _is_allowed2.default)(collectionName, this.userId)) {
        throw new context.Meteor.Error('not allowed', 'You are not allowed');
      }
      if (context.Meteor.isClient) {
        return { docs: [], count: 0 };
      }
      this.unblock();

      var _getListResult = (0, _getListResult3.default)({
        context: context,
        collectionConfig: collectionConfig,
        collectionName: collectionName,
        listOptions: listOptions,
        getDocuments: false
      }),
          count = _getListResult.count;

      return count;
    }
  });
};
//# sourceMappingURL=listCount.js.map