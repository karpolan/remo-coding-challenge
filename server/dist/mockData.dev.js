"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var TableConfig = require('../src/components/tableConfig.json');

var MAX_USERS_ON_TABLE = 6;
var TABLES = TableConfig.tables || [];
/**
 * Generates Mock data
 * Users, and so on
 */

function generateMockData() {
  // const userCount = 5;
  var userCount = 99;
  var users = [];

  for (var i = 0; i < userCount; i++) {
    var newUser = {
      id: "id_".concat(i),
      uid: "uid_".concat(i),
      idToken: "id_token_".concat(i),
      email: "email".concat(i + 1, "@domain.com"),
      name: "User #".concat(i + 1)
    };
    users.push(newUser);
  }

  return {
    currentUser: {
      id: 'id_unknown',
      name: 'Guess who?'
    },
    users: users
  };
}
/**
 * Returns list of users who are sitting on the specific table
 */


function usersOnTable(users, tableId) {
  if (!users || !Array.isArray(users)) return [];
  var result = users.filter(function (user) {
    return user.tableId === tableId;
  }); // console.log(`usersOnTable(${tableId}) - result:`, result);

  return result;
}
/**
 * Finds table with given id
 */


function tableById(tableId) {
  var result = TABLES.find(function (table) {
    return table.id === tableId;
  });
  return result || defaultTable;
}
/**
 * Returns  most empty table
 * @returns {object|null} "free" table, null means there is no free table
 */


function getFreeTable(users) {
  var sortedTables = _toConsumableArray(TABLES).sort(function (a, b) {
    var A = usersOnTable(users, a.id).length;
    var B = usersOnTable(users, b.id).length; // console.log(A, B);

    if (A === 1) return -1; // Table with 1 user has priority

    if (B === 1) return 1; // Table with 1 user has priority

    return MAX_USERS_ON_TABLE - B - (MAX_USERS_ON_TABLE - A);
  }); // console.log('getFreeTable:', sortedTables[0].id);
  // When there is no user on the tables


  var mostFreeTableSeatsCount = usersOnTable(users, sortedTables[0].id).length; // console.log('mostFreeTableSeatsCount:', mostFreeTableSeatsCount);

  if (mostFreeTableSeatsCount >= MAX_USERS_ON_TABLE) return null; // there is no free seats at all!

  return sortedTables[0];
}
/**
 * Puts many users to full list of tables according to algorith:
 * First users sit by pairs on free tables. When all tables have more then 2+ users, users added to "most empty" tables.
 * @param {array} users
 * @returns {array} of users with tableIds
 */


function usersToTables(users) {
  if (!Array.isArray(users)) return [];

  for (var userIndex = 0; userIndex < users.length; userIndex++) {
    var table = getFreeTable(users);

    if (!table) {
      throw new Error("No enough free seats! We can not place user #".concat(userIndex));
    } // Assign table to user


    users[userIndex].tableId = table.id;
  }

  return users;
}
/**
 * Initialization
 */


var mockData = generateMockData();
usersToTables(mockData.users);
module.exports = mockData; // export default mockData;