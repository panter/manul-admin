"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Layout = function Layout(_ref) {
  var content = _ref.content;
  return _react2.default.createElement(
    "div",
    null,
    content()
  );
};
var List = function List(_ref2) {
  var docs = _ref2.docs;
  return _react2.default.createElement(
    "pre",
    null,
    (0, _stringify2.default)(docs)
  );
};
var Create = function Create() {
  return _react2.default.createElement(
    "p",
    null,
    "Please specify components.create in adminContext"
  );
};
var Edit = function Edit() {
  return _react2.default.createElement(
    "p",
    null,
    "Please specify components.edit in adminContext"
  );
};
var Preview = function Preview(_ref3) {
  var _id = _ref3.doc._id;
  return _react2.default.createElement(
    "span",
    null,
    _id
  );
};
var LookupButton = function LookupButton(_ref4) {
  var onClick = _ref4.onClick;
  return _react2.default.createElement(
    "button",
    { onClick: onClick, type: "button" },
    _react2.default.createElement(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", width: "12", height: "13" },
      _react2.default.createElement(
        "g",
        { fill: "none", stroke: "#6c6c6c", strokeWidth: "2" },
        _react2.default.createElement("path", { d: "M11.3 11.7l-4-4" }),
        _react2.default.createElement("circle", { cx: "5", cy: "5", r: "4" })
      )
    )
  );
};
var Modal = function Modal() {
  return _react2.default.createElement(
    "p",
    null,
    "Please specify components.modal in adminContext if you want to use lookup feature"
  );
};

exports.default = {
  layout: Layout,
  list: List,
  create: Create,
  edit: Edit,
  preview: Preview,
  lookupButton: LookupButton,
  modal: Modal
};
//# sourceMappingURL=default_components.js.map