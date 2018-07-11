'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _simplSchema = require('simpl-schema');

var _simplSchema2 = _interopRequireDefault(_simplSchema);

var _is_allowed = require('../is_allowed');

var _is_allowed2 = _interopRequireDefault(_is_allowed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref, collectionName, collectionConfig) {
  var ValidatedMethod = _ref.ValidatedMethod,
      Meteor = _ref.Meteor;
  return new ValidatedMethod({
    name: 'manulAdmin.' + collectionName + '.destroy',
    validate: new _simplSchema2.default({ _id: { type: String } }).validator({
      clean: true
    }),
    run: function run(_ref2) {
      var _id = _ref2._id;

      // console.log('inserting', doc);
      if (!(0, _is_allowed2.default)(collectionName, this.userId)) {
        throw new Meteor.Error('not allowed', 'You are not allowed');
      }
      return collectionConfig.collection.remove(_id);
    }
  });
};
//# sourceMappingURL=destroy.js.map