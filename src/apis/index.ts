const API_URL = 'http://localhost:8000';
const HEADERS = {
  Accept: 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export async function apiGetUsers() {
  const LOG_ID = 'apiGetUsers()';
  console.time(LOG_ID);
  try {
    const res = await fetch(`${API_URL}/users`, {
      headers: HEADERS,
      method: 'GET',
      mode: 'cors',
    });
    const result = await res.json();
    // console.warn(`${LOG_ID} - success:`, result);
    return result;
  } catch (error) {
    console.error(`${LOG_ID} -`, error);
    return [];
  } finally {
    console.timeEnd(LOG_ID);
  }
}

export async function apiPostUsers(users: []) {
  const LOG_ID = 'apiPostUsers()';
  console.time(LOG_ID);
  try {
    const res = await fetch(`${API_URL}/users`, {
      headers: HEADERS,
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(users),
    });
    const result = res.status < 400;
    // console.warn(`${LOG_ID} - success:`, result);
    return result;
  } catch (error) {
    console.error(`${LOG_ID} -`, error);
    return false;
  } finally {
    console.timeEnd(LOG_ID);
  }
}

export async function apiGetCurrentUser() {
  const LOG_ID = 'apiGetCurrentUser()';
  console.time(LOG_ID);
  try {
    const res = await fetch(`${API_URL}/currentUser`, {
      headers: HEADERS,
      method: 'GET',
      mode: 'cors',
    });
    const result = await res.json();
    console.warn(`${LOG_ID} - success:`, result);
    return result;
  } catch (error) {
    console.error(`${LOG_ID} -`, error);
    return {};
  } finally {
    console.timeEnd(LOG_ID);
  }
}

export async function apiPostCurrentUser(user: object) {
  const LOG_ID = 'apiPostCurrentUser()';
  console.time(LOG_ID);
  try {
    const res = await fetch(`${API_URL}/currentUser`, {
      headers: HEADERS,
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(user),
    });
    const result = res.status < 400;
    console.warn(`${LOG_ID} - success:`, result);
    return result;
  } catch (error) {
    console.error(`${LOG_ID} -`, error);
    return false;
  } finally {
    console.timeEnd(LOG_ID);
  }
}

export const sendGetRequest = async (endpoint: string) => {
  const fullUrl = endpoint.indexOf(API_URL) === -1 ? API_URL + endpoint : endpoint;

  const headers = {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const rawResponse = await fetch(fullUrl, {
      headers,
      method: 'GET',
      mode: 'cors',
    }).then((result) => {
      return result;
    });

    return await rawResponse.json();
  } catch (e) {
    throw e;
  }
};

export const sendPostRequest = async (endpoint: string, data: any) => {
  const fullUrl = endpoint.indexOf(API_URL) === -1 ? API_URL + endpoint : endpoint;
  const headers = {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };
  try {
    const rawResponse = await fetch(fullUrl, {
      body: JSON.stringify(data),
      headers,
      method: 'POST',
      mode: 'cors',
    }).then((result) => {
      return result;
    });

    return await rawResponse.json();
  } catch (e) {
    throw e;
  }
};
