/**
Best use https://github.com/panter/manul-alerts !
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {
  handleCallback: function handleCallback(namespace, _ref, next) {
    var props = _ref.props;

    return function (error, result) {
      if (error) {
        window.alert("an error occured: " + (error.reason || error.message));
      } else {
        window.alert(namespace + " success!");
      }
      next(error, result);
    };
  }
};
module.exports = exports["default"];
//# sourceMappingURL=fallback_alerts.js.map