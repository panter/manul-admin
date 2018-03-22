"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getEditPublicationName = function getEditPublicationName(name) {
  return "admin." + name + ".edit";
};

var getPublications = function getPublications(name) {
  return {
    edit: getEditPublicationName(name)
  };
};

exports.default = {
  getPublications: getPublications
};
//# sourceMappingURL=publication_utils.js.map