'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.placeUserToTables = placeUserToTables;

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError('Invalid attempt to spread non-iterable instance');
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === '[object Arguments]')
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}

/**
 * Puts the given user onto first free seat of the specific table
 * @param {object} table - table object with seats arrays
 * @param {object} user - user object to add
 * @returns {number} index of seat, -1 means there was no free seats
 */
function addUserToTable(table, user) {
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
  var userSeat = table.seats.find(function (seat) {
    return seat.user === user;
  }); // Todo: compting of user.id could be enough

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
  var sortedTables = _toConsumableArray(tables).sort(function (a, b) {
    if (countOccupiedSeats(a) === 1) return -1; // Table with 1 user has priority

    if (countOccupiedSeats(b) === 1) return 1; // Table with 1 user has priority

    return countFreeSeats(b) - countFreeSeats(a);
  });
  // console.log('sortedTables:', sortedTables);

  var mostFreeTableSeatsCount = countFreeSeats(sortedTables[0]);
  if (mostFreeTableSeatsCount < 1) return -1; // there is no free seats at all!

  var result = tables.indexOf(sortedTables[0]);
  return result;
}
/**
 * Puts many users to full list of tables according to algorith:
 * First users sit by pairs on free tables. When all tables have more then 2+ users, users added to "most empty" tables.
 * @param {array} users
 * @param {array} tables
 * @returns {array} of tables with users inside
 */

function placeUserToTables(users, tables) {
  for (var userIndex = 0; userIndex < users.length; userIndex++) {
    var tableIndex = getFreeTableIndex(tables);

    if (tableIndex < 0) {
      throw new Error('No enough free seats! We can not place user #'.concat(userIndex));
    }

    addUserToTable(tables[tableIndex], users[userIndex]);
  }

  return tables;
}
