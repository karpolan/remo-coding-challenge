"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUserToTable = addUserToTable;
exports.removeUserFromTable = removeUserFromTable;
exports.findTableById = findTableById;
exports.findTableByUserId = findTableByUserId;
exports.placeUserToTables = placeUserToTables;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * Puts the given user onto first free seat of the specific table
 * @param {object} table - table object with seats arrays
 * @param {object} user - user object to add
 * @returns {number} index of seat, -1 means there was no free seats
 */
function addUserToTable(table, user) {
  if (!table || !Array.isArray(table.seats)) return -1;
  var freeSeat = table.seats.find(function (seat) {
    return !seat.user;
  });

  if (!freeSeat) {
    return -1; // Cannot find empty seat
  }

  freeSeat.user = user;
  return table.seats.indexOf(freeSeat);
}
/**
 * Removes the given user from specific table
 * @param {object} table - table object with seats arrays
 * @param {object} user - user object to remove
 * @returns {number} index of seat the removed user had, -1 means there is no user on that table
 */


function removeUserFromTable(table, user) {
  if (!table || !Array.isArray(table.seats)) return -1;
  var userSeat = table.seats.find(function (seat) {
    return seat.user.id === user.id;
  }); // Todo: do we need full object match?

  if (!userSeat) {
    return -1; // Cannot find user
  }

  var result = table.seats.indexOf(userSeat);
  userSeat.user = null;
  return result;
}
/**
 * Returns number of seats without assigned user on given table
 * @param {object} table - table object with seats arrays
 * @returns {number} number of empty seats
 */


function countFreeSeats(table) {
  if (!table || !Array.isArray(table.seats)) return -1;
  var result = table.seats.reduce(function (prev, curr) {
    return curr.user ? prev : prev + 1;
  }, 0); // console.log(`getFreeSeatsOnTable(${table.id}) - result`, result);

  return result;
}
/**
 * Returns number of seats with assigned user on given table
 * @param {object} table - table object with seats arrays
 * @returns {number} number of occupied seats
 */


function countOccupiedSeats(table) {
  if (!table || !Array.isArray(table.seats)) return -1;
  var result = table.seats.reduce(function (prev, curr) {
    return curr.user ? prev + 1 : prev;
  }, 0); // console.log(`getFreeSeatsOnTable(${table.id}) - result`, result);

  return result;
}
/**
 * Returns index of free table ot most empty one
 * @param {array} tables - arrays ot table objects with seats arrays
 * @returns {number} index of "free" table,  -1 means there is no free table
 */


function getFreeTableIndex(tables) {
  if (!Array.isArray(tables)) return -1;

  var sortedTables = _toConsumableArray(tables).sort(function (a, b) {
    if (countOccupiedSeats(a) === 1) return -1; // Table with 1 user has priority

    if (countOccupiedSeats(b) === 1) return 1; // Table with 1 user has priority

    return countFreeSeats(b) - countFreeSeats(a);
  }); // console.log('sortedTables:', sortedTables);
  // When there is no user on the tables


  var mostFreeTableSeatsCount = countFreeSeats(sortedTables[0]);
  if (mostFreeTableSeatsCount < 1) return -1; // there is no free seats at all!

  var result = tables.indexOf(sortedTables[0]);
  return result;
}
/**
 * Returns table object with given id
 * @param {array} tables - arrays ot table objects with seats arrays
 * @param {string} tableId - id of the table to find
 * @returns {object} - found table object or null
 */


function findTableById(tables, tableId) {
  if (!Array.isArray(tables)) return null;
  return tables.find(function (table) {
    return table.id === tableId;
  });
}
/**
 * Returns table object where the user is sitting
 * @param {array} tables - arrays ot table objects with seats arrays
 * @param {string} userId - id of the user who is sitting on the table to find
 * @returns {object} - found table object or null
 */


function findTableByUserId(tables, userId) {
  if (!Array.isArray(tables)) return null;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = tables[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var table = _step.value;
      var userFound = table.seats.find(function (user) {
        return user.id === userId;
      });
      if (userFound) return table;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return null;
}
/**
 * Puts many users to full list of tables according to algorith:
 * First users sit by pairs on free tables. When all tables have more then 2+ users, users added to "most empty" tables.
 * @param {array} tables
 * @param {array} users
 * @returns {array} of tables with users inside
 */


function placeUserToTables(tables, users) {
  if (!Array.isArray(users)) return tables;

  for (var userIndex = 0; userIndex < users.length; userIndex++) {
    var tableIndex = getFreeTableIndex(tables);

    if (tableIndex < 0) {
      throw new Error("No enough free seats! We can not place user #".concat(userIndex));
    }

    addUserToTable(tables[tableIndex], users[userIndex]);
  }

  return tables;
}