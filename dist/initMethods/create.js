'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _is_allowed = require('../is_allowed');

var _is_allowed2 = _interopRequireDefault(_is_allowed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref, collectionName, collectionConfig) {
  var ValidatedMethod = _ref.ValidatedMethod,
      Meteor = _ref.Meteor;
  return new ValidatedMethod({
    name: 'manulAdmin.' + collectionName + '.create',
    validate: (collectionConfig.allowInsertWithId ? collectionConfig.collection.simpleSchema().extend({
      _id: { type: String, optional: true }
    }) : collectionConfig.collection.simpleSchema()).validator({ clean: true }),
    run: function run(doc) {
      // console.log('inserting', doc);
      if (!(0, _is_allowed2.default)(collectionName, this.userId)) {
        throw new Meteor.Error('not allowed', 'You are not allowed');
      }
      return collectionConfig.collection.insert(doc);
    }
  });
};
//# sourceMappingURL=create.js.map