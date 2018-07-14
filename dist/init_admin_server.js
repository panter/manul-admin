'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _mapValues2 = require('lodash/mapValues');

var _mapValues3 = _interopRequireDefault(_mapValues2);

var _keyBy2 = require('lodash/keyBy');

var _keyBy3 = _interopRequireDefault(_keyBy2);

var _is_allowed = require('./is_allowed');

var _is_allowed2 = _interopRequireDefault(_is_allowed);

var _initMethods = require('./initMethods');

var _initMethods2 = _interopRequireDefault(_initMethods);

var _publication_utils = require('./utils/publication_utils');

var _publication_utils2 = _interopRequireDefault(_publication_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
update: we no longer publish list, because we use a method call for that
*/

exports.default = function (_ref, config) {
  var Meteor = _ref.Meteor,
      ValidatedMethod = _ref.ValidatedMethod;

  var isAllowed = (0, _is_allowed2.default)(config);
  var collections = config.collections;

  var createTextIndex = function createTextIndex(name) {
    var _collections$name = collections[name],
        collection = _collections$name.collection,
        textIndex = _collections$name.textIndex;

    if (textIndex) {
      var indexDef = (0, _mapValues3.default)((0, _keyBy3.default)(textIndex), function () {
        return 'text';
      });

      try {
        collection._ensureIndex(indexDef, {
          background: true,
          name: 'manul-admin-text_' + name
        });
      } catch (e) {
        console.error("can't set index", e);
      }
    }
  };
  var initTextIndex = function initTextIndex() {
    (0, _keys2.default)(collections).forEach(createTextIndex);
  };
  initTextIndex();
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
  (0, _initMethods2.default)({ Meteor: Meteor, ValidatedMethod: ValidatedMethod, config: config });
};
//# sourceMappingURL=init_admin_server.js.map