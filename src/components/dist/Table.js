"use strict";
exports.__esModule = true;
var React = require("react");
var User_1 = require("./User");
/**
 * Renders single Table at specific position
 * Also renders Users on Seat
 */
var Table = function (_a) {
    var id = _a.id, x = _a.x, y = _a.y, width = _a.width, height = _a.height, seats = _a.seats, users = _a.users, onClick = _a.onClick, onDoubleClick = _a.onDoubleClick;
    var style = {
        left: x,
        top: y,
        width: width,
        height: height
    };
    return (React.createElement("div", { className: "rt-room", style: style, onClick: onClick, onDoubleClick: onDoubleClick },
        React.createElement("div", { className: "rt-room-name" }, id),
        users && (users === null || users === void 0 ? void 0 : users.map(function (user, index) {
            var id = user.id, name = user.name, avatar = user.avatar, currentUser = user.currentUser;
            var seat = (seats && seats[index]) || { x: 0, y: 0 };
            var x = seat.x, y = seat.y;
            return React.createElement(User_1["default"], { key: id || index, x: x, y: y, name: name, avatar: avatar, currentUser: currentUser });
        }))));
};
exports["default"] = Table;
