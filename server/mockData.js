const TableConfig = require('../src/components/tableConfig.json');

const MAX_USERS_ON_TABLE = 6;
const TABLES = TableConfig.tables || [];

/**
 * Generates Mock data
 * Users, and so on
 */
function generateMockData() {
  // const userCount = 5;
  const userCount = 99;
  const users = [];
  for (let i = 0; i < userCount; i++) {
    const newUser = {
      id: `id_${i}`,
      uid: `uid_${i}`,
      idToken: `id_token_${i}`,
      email: `email${i + 1}@domain.com`,
      name: `User #${i + 1}`,
    };
    users.push(newUser);
  }
  return {
    currentUser: {
      id: 'id_unknown',
      name: 'Guess who?',
    },
    users,
  };
}

/**
 * Returns list of users who are sitting on the specific table
 */
function usersOnTable(users, tableId) {
  if (!users || !Array.isArray(users)) return [];

  const result = users.filter((user) => user.tableId === tableId);
  // console.log(`usersOnTable(${tableId}) - result:`, result);
  return result;
}

/**
 * Finds table with given id
 */
function tableById(tableId) {
  const result = TABLES.find((table) => table.id === tableId);
  return result || defaultTable;
}

/**
 * Returns  most empty table
 * @returns {object|null} "free" table, null means there is no free table
 */
function getFreeTable(users) {
  const sortedTables = [...TABLES].sort((a, b) => {
    const A = usersOnTable(users, a.id).length;
    const B = usersOnTable(users, b.id).length;
    // console.log(A, B);
    if (A === 1) return -1; // Table with 1 user has priority
    if (B === 1) return 1; // Table with 1 user has priority
    return MAX_USERS_ON_TABLE - B - (MAX_USERS_ON_TABLE - A);
  });
  // console.log('getFreeTable:', sortedTables[0].id);

  // When there is no user on the tables
  const mostFreeTableSeatsCount = usersOnTable(users, sortedTables[0].id).length;
  // console.log('mostFreeTableSeatsCount:', mostFreeTableSeatsCount);
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

  for (let userIndex = 0; userIndex < users.length; userIndex++) {
    const table = getFreeTable(users);
    if (!table) {
      throw new Error(`No enough free seats! We can not place user #${userIndex}`);
    }
    // Assign table to user
    users[userIndex].tableId = table.id;
  }
  return users;
}

/**
 * Initialization
 */
const mockData = generateMockData();
usersToTables(mockData.users);

module.exports = mockData;
// export default mockData;
