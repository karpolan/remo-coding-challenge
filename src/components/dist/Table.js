"use strict";
exports.__esModule = true;
var React = require("react");
/**
 * Renders single Table at specific position
 */
var Table = function (_a) {
    var id = _a.id, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    var tableStyle = {
        left: x,
        top: y,
        width: width,
        height: height
    };
    return (React.createElement("div", { className: "rt-room", style: tableStyle },
        React.createElement("div", { className: "rt-room-name" }, id)));
};
exports["default"] = Table;
