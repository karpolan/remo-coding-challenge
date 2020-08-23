"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var React = require("react");
require("./Theater.scss");
var conference_map_svg_1 = require("../assets/conference-map.svg");
var tableConfig_json_1 = require("./tableConfig.json");
var Table_1 = require("./Table");
var Theater = function () {
    var listTables = tableConfig_json_1["default"].tables || [];
    return (React.createElement("div", { className: "remo-theater", style: { width: tableConfig_json_1["default"].width, height: tableConfig_json_1["default"].height } },
        React.createElement("div", { className: "rt-app-bar" },
            React.createElement("a", { href: "javascript:;" }, "Logout")),
        React.createElement("div", { className: "rt-rooms" }, listTables.map(function (table) { return React.createElement(Table_1["default"], __assign({}, table)); })),
        React.createElement("div", { className: "rt-background" },
            React.createElement("img", { src: conference_map_svg_1["default"], alt: "Conference background" }))));
};
exports["default"] = Theater;
