"use strict";
exports.__esModule = true;
var React = require("react");
var User_1 = require("./User");
/**
 * Renders single Table at specific position
 * Also renders Users on Seat
 */
var Table = function (_a) {
    var id = _a.id, x = _a.x, y = _a.y, width = _a.width, height = _a.height, seats = _a.seats, onClick = _a.onClick, onDoubleClick = _a.onDoubleClick;
    var style = {
        left: x,
        top: y,
        width: width,
        height: height
    };
    return (React.createElement("div", { className: "rt-room", style: style, onClick: onClick, onDoubleClick: onDoubleClick },
        React.createElement("div", { className: "rt-room-name" }, id),
        seats && (seats === null || seats === void 0 ? void 0 : seats.map(function (_a, index) {
            var x = _a.x, y = _a.y, user = _a.user;
            return React.createElement(User_1["default"], { key: (user === null || user === void 0 ? void 0 : user.id) || index, x: x, y: y, name: user === null || user === void 0 ? void 0 : user.name, avatar: user === null || user === void 0 ? void 0 : user.avatar });
        }))));
};
exports["default"] = Table;
