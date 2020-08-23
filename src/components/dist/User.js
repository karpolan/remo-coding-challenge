"use strict";
exports.__esModule = true;
var React = require("react");
var consts_1 = require("../utils/consts");
/**
 * Renders single User at specific position.
 * Don't render user without name
 */
var User = function (_a) {
    var x = _a.x, y = _a.y, name = _a.name, avatar = _a.avatar;
    if (!name)
        return null; // Don't render non-existing users
    var style = {
        left: x,
        top: y
    };
    return (React.createElement("div", { className: 'rt-user', style: style },
        React.createElement("div", { className: 'avatar' },
            React.createElement("img", { src: avatar || consts_1.DEFAULT_AVATAR, title: name, alt: name })),
        avatar ? null : React.createElement("div", { className: 'title' }, name)));
};
exports["default"] = User;
