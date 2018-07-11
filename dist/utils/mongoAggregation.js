"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref, collection, pipeline, options) {
  var Meteor = _ref.Meteor;
  return Meteor.wrapAsync(collection.rawCollection().bind(collection))(pipeline, options);
};
//# sourceMappingURL=mongoAggregation.js.map