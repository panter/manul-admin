'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _is_allowed = require('../is_allowed');

var _is_allowed2 = _interopRequireDefault(_is_allowed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref, collectionName, collectionConfig) {
  var ValidatedMethod = _ref.ValidatedMethod,
      Meteor = _ref.Meteor;
  return new ValidatedMethod({
    name: 'manulAdmin.' + collectionName + '.update',
    validate: collectionConfig.collection.simpleSchema().extend({
      _id: { type: String }
    }).validator({ clean: true }),
    run: function run(_ref2) {
      var _id = _ref2._id,
          doc = (0, _objectWithoutProperties3.default)(_ref2, ['_id']);

      // console.log('updating', collectionName, _id, doc);
      if (Meteor.isServer) {
        if (!(0, _is_allowed2.default)(collectionName, this.userId)) {
          throw new Meteor.Error('not allowed', 'You are not allowed');
        }

        // Whole-doc update is not supported by simpl-schema,
        // as workaround we use bypassCollection2: true
        // https://github.com/aldeed/meteor-simple-schema/issues/175
        var updated = collectionConfig.collection.update(_id, { $set: doc }, { bypassCollection2: true });
        if (updated === 0) {
          throw new Meteor.Error('not found', 'Entry not found');
        }
      }
    }
  });
};
//# sourceMappingURL=update.js.map