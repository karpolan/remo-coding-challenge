"use strict";
exports.__esModule = true;
var React = require("react");
var consts_1 = require("./consts");
/**
 * Renders single User at specific position
 */
var User = function (_a) {
    var x = _a.x, y = _a.y, name = _a.name, avatar = _a.avatar, index = _a.index;
    if (!name)
        return null; // Don't render non-existing users
    var style = {
        left: x,
        top: y
    };
    return (React.createElement("div", { className: 'rt-user', style: style },
        React.createElement("div", { className: 'avatar' },
            React.createElement("img", { src: avatar || consts_1.DEFAULT_AVATAR, title: name })),
        React.createElement("div", { className: 'title' }, name)));
};
exports["default"] = User;
