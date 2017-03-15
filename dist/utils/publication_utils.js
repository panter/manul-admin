"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});
var getEditPublicationName = function getEditPublicationName(name) {
   return "admin." + name + ".edit";
};

var getListPublicationName = function getListPublicationName(name) {
   return "admin." + name + ".list";
};

var getMatchingResultsCountName = function getMatchingResultsCountName(name) {
   return "admin." + name + ".counts";
};

var getPublications = function getPublications(name) {
   return {
      list: getListPublicationName(name),
      edit: getEditPublicationName(name),
      counts: getMatchingResultsCountName(name)
   };
};

exports["default"] = {
   getPublications: getPublications, getEditPublicationName: getEditPublicationName, getListPublicationName: getListPublicationName, getMatchingResultsCountName: getMatchingResultsCountName
};
module.exports = exports["default"];
//# sourceMappingURL=publication_utils.js.map