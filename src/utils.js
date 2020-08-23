/**
 * Puts the given user onto first free seat of the specific table
 * @param {object} table - table object with seats arrays
 * @param {object} user - user object to add
 * @returns {number} index of seat, -1 means there was no free seats
 */
function addUserToTable(table, user) {
  const freeSeat = table.seats.find((seat) => !seat.user);
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
  const userSeat = table.seats.find((seat) => seat.user === user); // Todo: compting of user.id could be enough
  if (!userSeat) {
    return -1; // Cannot find user
  }
  const result = table.seats.indexOf(userSeat);
  userSeat.user = null;
  return result;
}

/**
 * Returns number of seats without assigned user on given table
 * @param {object} table - table object with seats arrays
 * @returns {number} number of empty seats
 */
function countFreeSeats(table) {
  const result = table.seats.reduce((prev, curr) => (curr.user ? prev : prev + 1), 0);
  // console.log(`getFreeSeatsOnTable(${table.id}) - result`, result);
  return result;
}

/**
 * Returns number of seats with assigned user on given table
 * @param {object} table - table object with seats arrays
 * @returns {number} number of occupied seats
 */
function countOccupiedSeats(table) {
  const result = table.seats.reduce((prev, curr) => (curr.user ? prev + 1 : prev), 0);
  // console.log(`getFreeSeatsOnTable(${table.id}) - result`, result);
  return result;
}

/**
 * Returns index of free table ot most empty one
 * @param {array} tables - arrays ot table objects with seats arrays
 * @returns {number} index of "free" table,  -1 means there is no free table
 */
function getFreeTableIndex(tables) {
  const sortedTables = [...tables].sort((a, b) => {
    if (countOccupiedSeats(a) === 1) return -1; // Table with 1 user has priority
    if (countOccupiedSeats(b) === 1) return 1; // Table with 1 user has priority
    return countFreeSeats(b) - countFreeSeats(a);
  });
  console.log('sortedTables:', sortedTables);

  // When there is no user on the tables
  const mostFreeTableSeatsCount = countFreeSeats(sortedTables[0]);
  if (mostFreeTableSeatsCount < 1) return -1; // there is no free seats at all!

  const result = tables.indexOf(sortedTables[0]);
  return result;
}

/**
 * Puts many users to full list of tables according to algorith:
 * First users sit by pairs on free tables. When all tables have more then 2+ users, users added to "most empty" tables.
 * @param {array} users
 * @param {array} tables
 * @returns {array} of tables with users inside
 */
export function placeUserToTables(users, tables) {
  for (let userIndex = 0; userIndex < users.length; userIndex++) {
    const tableIndex = getFreeTableIndex(tables);
    if (tableIndex < 0) {
      throw new Error(`No enough free seats! We can not place user #${userIndex}`);
    }
    addUserToTable(tables[tableIndex], users[userIndex]);
  }
  return tables;
}
