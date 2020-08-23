"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.mockData = void 0;

var _consts = require("./consts");

/**
 * Generates Mock data
 * Users, and so on
 */
function generateMockData() {
  var userCount = 69;
  var users = [];

  for (var i = 0; i < userCount; i++) {
    var newUser = {
      id: "id_".concat(i),
      uid: "uid_".concat(i),
      idToken: "id_token_".concat(i),
      email: "email".concat(i + 1, "@domain.com"),
      name: "User #".concat(i + 1),
      avatar: _consts.DEFAULT_AVATAR
    };
    users.push(newUser);
  }

  return {
    userCount: userCount,
    users: users
  };
}

var mockData = generateMockData();
exports.mockData = mockData;
var _default = mockData;
exports["default"] = _default;