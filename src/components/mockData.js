import { DEFAULT_AVATAR } from './consts';

/**
 * Generates Mock data
 * Users, and so on
 */
function generateMockData() {
  const userCount = 69;
  const users = [];
  for (let i = 0; i < userCount; i++) {
    const newUser = {
      id: `id_${i}`,
      uid: `uid_${i}`,
      idToken: `id_token_${i}`,
      email: `email${i + 1}@domain.com`,
      name: `User #${i + 1}`,
      avatar: DEFAULT_AVATAR,
    };
    users.push(newUser);
  }
  return {
    userCount,
    users,
  };
}

export const mockData = generateMockData();
export default mockData;