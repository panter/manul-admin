'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _publication_utils = require('./utils/publication_utils');

var _publication_utils2 = _interopRequireDefault(_publication_utils);

var _create_methods = require('./create_methods');

var _create_methods2 = _interopRequireDefault(_create_methods);

var _is_allowed = require('./is_allowed');

var _is_allowed2 = _interopRequireDefault(_is_allowed);

var _query_utils = require('./utils/query_utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HARD_LIMIT = 1000;

// SimpleSchema needs only to be passed, if its not in npm (version 2)

exports.default = function (_ref, config) {
  var Meteor = _ref.Meteor,
      ValidatedMethod = _ref.ValidatedMethod,
      Counts = _ref.Counts,
      _ref$SimpleSchema = _ref.SimpleSchema,
      SimpleSchema = _ref$SimpleSchema === undefined ? null : _ref$SimpleSchema;

  var isAllowed = (0, _is_allowed2.default)(config);
  var collections = config.collections;


  var createPublication = function createPublication(name) {
    var _publicationUtils$get = _publication_utils2.default.getPublications(name),
        list = _publicationUtils$get.list,
        edit = _publicationUtils$get.edit,
        counts = _publicationUtils$get.counts;

    var _collections$name = collections[name],
        collection = _collections$name.collection,
        searchFields = _collections$name.searchFields,
        transformFilter = _collections$name.transformFilter;

    /* eslint meteor/audit-argument-checks: 0*/

    Meteor.publish(list, function publishList(filter) {
      var searchTerm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var sortProperties = arguments[2];

      if (isAllowed(name, this.userId)) {
        var query = (0, _query_utils.filterToQuery)(filter, searchTerm && { searchFields: searchFields, searchTerm: searchTerm }, transformFilter);
        // counts is always without limiting

        Counts.publish(this, counts, collection.find(query));
        var sort = (0, _query_utils.sortPropsToMongoSort)(sortProperties);
        return collection.find(query, { sort: sort, limit: HARD_LIMIT });
      }
    });
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