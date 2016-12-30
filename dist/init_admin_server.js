'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _utilsPublication_utils = require('./utils/publication_utils');

var _utilsPublication_utils2 = _interopRequireDefault(_utilsPublication_utils);

var _create_methods = require('./create_methods');

var _create_methods2 = _interopRequireDefault(_create_methods);

var _is_allowed = require('./is_allowed');

var _is_allowed2 = _interopRequireDefault(_is_allowed);

exports['default'] = function (_ref, config) {
  var Meteor = _ref.Meteor;
  var SimpleSchema = _ref.SimpleSchema;
  var ValidatedMethod = _ref.ValidatedMethod;
  var Counts = _ref.Counts;

  var isAllowed = (0, _is_allowed2['default'])(config);
  var collections = config.collections;

  var createPublication = function createPublication(name) {
    var _publicationUtils$getPublications = _utilsPublication_utils2['default'].getPublications(name);

    var list = _publicationUtils$getPublications.list;
    var edit = _publicationUtils$getPublications.edit;
    var counts = _publicationUtils$getPublications.counts;
    var collection = collections[name].collection;

    /* eslint meteor/audit-argument-checks: 0*/
    Meteor.publish(list, function publishList(query, options) {
      if (isAllowed(name, this.userId)) {
        // can't reuse "users" cursor
        Counts.publish(this, counts, collection.find(query, options));
        return collection.find(query, options);
      }
    });
    Meteor.publish(edit, function publishEdit(_id) {
      if (isAllowed(name, this.userId)) {
        return collection.find(_id);
      }
    });
  };
  var createPublications = function createPublications() {
    _Object$keys(collections).forEach(createPublication);
  };
  createPublications();
  (0, _create_methods2['default'])({ Meteor: Meteor, SimpleSchema: SimpleSchema, ValidatedMethod: ValidatedMethod }, config);
};

module.exports = exports['default'];
//# sourceMappingURL=init_admin_server.js.map