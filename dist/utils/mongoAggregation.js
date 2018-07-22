"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref, collection, pipeline, options) {
  var Meteor = _ref.Meteor;

  var coll = collection.rawCollection();
  return Meteor.wrapAsync(coll.aggregate.bind(coll))(pipeline, options);
};

var cursorToArray = exports.cursorToArray = function cursorToArray(_ref2, cursorOrArray) {
  var Meteor = _ref2.Meteor;

  if (!cursorOrArray || !cursorOrArray.toArray) {
    return cursorOrArray;
  }

  return Meteor.wrapAsync(cursorOrArray.toArray.bind(cursorOrArray))();
};
//# sourceMappingURL=mongoAggregation.js.map