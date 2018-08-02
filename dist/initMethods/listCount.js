'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _is_allowed = require('../is_allowed');

var _is_allowed2 = _interopRequireDefault(_is_allowed);

var _schemas = require('../schemas');

var _getListResult = require('./getListResult');

var _getListResult2 = _interopRequireDefault(_getListResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (context, collectionName, collectionConfig) {
  return new context.ValidatedMethod({
    name: 'manulAdmin.' + collectionName + '.listCount',
    validate: _schemas.ListSchema.validator({ clean: false }),
    run: function run(listOptions) {
      var _this = this;

      return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _ref, count;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if ((0, _is_allowed2.default)(collectionName, _this.userId)) {
                  _context.next = 2;
                  break;
                }

                throw new context.Meteor.Error('not allowed', 'You are not allowed');

              case 2:
                if (!context.Meteor.isClient) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt('return', { docs: [], count: 0 });

              case 4:
                _this.unblock();
                _context.next = 7;
                return (0, _getListResult2.default)({
                  context: context,
                  collectionConfig: collectionConfig,
                  collectionName: collectionName,
                  listOptions: listOptions,
                  getDocuments: false
                });

              case 7:
                _ref = _context.sent;
                count = _ref.count;
                return _context.abrupt('return', count);

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  });
};
//# sourceMappingURL=listCount.js.map