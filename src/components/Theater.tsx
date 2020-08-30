import React, { useEffect, useState } from 'react';
import TableConfig from './tableConfig.json';
import './Theater.scss';
import MapImage from '../assets/conference-map.svg';
import TableComponent from './Table';
import Firebase from '../services/firebase';
import { useHistory } from 'react-router-dom';
import { IUser } from './types';
import { TABLES, MAX_USERS_ON_TABLE, defaultUser, usersOnTable } from '../utils/arrange'
import { apiGetUsers, apiPostCurrentUser, apiGetCurrentUser } from '../apis'


const Theater: React.FC = () => {
  const history = useHistory();
  const [user, setUser] = useState<IUser>(defaultUser) // Current user
  const [users, setUsers] = useState<IUser[]>([])  // All users
  const [loading, setLoading] = useState<Boolean>(true)

  useEffect(() => {
    async function fetchData() {
      // Current Logged user
      Firebase.auth().onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          const apiUser = await apiGetCurrentUser();
          setUser({
            ...apiUser,
            id: currentUser.uid,
            uid: currentUser.uid,
            idToken: await currentUser.getIdToken(),
            email: String(currentUser.email),
            name: String(currentUser.displayName),
            avatar: String(currentUser.photoURL),
            currentUser: true,
          })
        } else {
          setUser(defaultUser)
        }
      })

      // Users form DB
      const usersFormApi = await apiGetUsers()
      setUsers(usersFormApi)
      setLoading(false);
    }
    fetchData();
  }, [])

  useEffect(() => {
    if (!user || user?.id === defaultUser.id) return;
    apiPostCurrentUser(user)
    setUsers([...users, user])
  }, [user])

  function moveUserToTable(tableId: string) {
    setUsers(users.filter((item) => item.id !== user.id))
    setUser({ ...user, tableId })
  }

  const handleLogout = async () => {
    await Firebase.auth().signOut();
    history.push('/');
  }

  function tableDoubleClick(tableId: string) {
    if (tableId === user.tableId) {
      console.log(`Current user is already sitting on "${tableId}" table`)
      return;
    }

    const tableUsers = usersOnTable(users, tableId);
    if (tableUsers.length >= MAX_USERS_ON_TABLE) {
      alert(`No free seats on "${tableId}" table!`);
      return;
    }
    // Current User can be added to this table
    moveUserToTable(tableId)
  }

  return (
    <div className="remo-theater" style={{ width: TableConfig.width, height: TableConfig.height }}>
      <div className="rt-app-bar">
        <div className='user'>
          {user.avatar ? <div className='avatar'><img src={user.avatar} title={user.name} alt={user.name} /></div> : null}
          <h5 >{user.name}</h5>
          {Boolean(user.email) && <h6 >{user.email}</h6>}
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="rt-rooms">
        {loading ? <div>Loading...</div> : TABLES.map((table) =>
          <TableComponent
            key={table.id}
            {...table}
            users={usersOnTable(users, table.id)}
            onDoubleClick={() => tableDoubleClick(table.id)}
          />)}
      </div>
      <div className="rt-background">
        <img src={MapImage} alt="Conference background" />
      </div>
    </div >
  );
};

export default Theater;
