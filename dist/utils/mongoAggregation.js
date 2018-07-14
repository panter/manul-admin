"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref, collection, pipeline, options) {
  var Meteor = _ref.Meteor;

  var coll = collection.rawCollection();
  return Meteor.wrapAsync(coll.aggregate.bind(coll))(pipeline, options);
};
//# sourceMappingURL=mongoAggregation.js.map