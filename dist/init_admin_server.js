'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _is_allowed = require('./is_allowed');

var _is_allowed2 = _interopRequireDefault(_is_allowed);

var _create_methods = require('./create_methods');

var _create_methods2 = _interopRequireDefault(_create_methods);

var _publication_utils = require('./utils/publication_utils');

var _publication_utils2 = _interopRequireDefault(_publication_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// SimpleSchema needs only to be passed, if its not in npm (version 2)

/**
update: we no longer publish list, because we use a method call for that
*/
exports.default = function (_ref, config) {
  var Meteor = _ref.Meteor,
      ValidatedMethod = _ref.ValidatedMethod,
      _ref$SimpleSchema = _ref.SimpleSchema,
      SimpleSchema = _ref$SimpleSchema === undefined ? null : _ref$SimpleSchema;

  var isAllowed = (0, _is_allowed2.default)(config);
  var collections = config.collections;


  var createPublication = function createPublication(name) {
    var _publicationUtils$get = _publication_utils2.default.getPublications(name),
        edit = _publicationUtils$get.edit;

    var collection = collections[name].collection;

    /* eslint meteor/audit-argument-checks: 0*/

    Meteor.publish(edit, function publishEdit(_id) {
      if (isAllowed(name, this.userId)) {
        return collection.find(_id);
      }
    });
  };
  var createPublications = function createPublications() {
    (0, _keys2.default)(collections).forEach(createPublication);
  };
  createPublications();
  (0, _create_methods2.default)({ Meteor: Meteor, ValidatedMethod: ValidatedMethod, SimpleSchema: SimpleSchema }, config);
};
//# sourceMappingURL=init_admin_server.js.map