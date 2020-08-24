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
  // const [table, setTable] = useState<ITable>(defaultTable)  // Table where Current user is sit
  //  const [tables, setTables] = useState<ITable[]>([])  // All Tables where sitting user
  const [users, setUsers] = useState<IUser[]>([])  // All users

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    if (!user || user?.id === defaultUser.id) return;
    apiPostCurrentUser(user)
  }, [user])

  function moveUserToTable(tableId: string) {
    setUser({
      ...user,
      tableId
    })
  }

  async function fetchData() {
    // Current Logged user
    Firebase.auth().onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser({
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

    // console.log('users:', users)
    // setTables(placeUserToTables(TABLES, users))

    // Current user
    const currentUser = await apiGetCurrentUser();
    console.log('currentUser:', currentUser)
    // if (currentUser.tableId) {
    //   const tableForCurrentUser = findTableById(TABLES/*tables*/, currentUser.tableId)
    //   const currentSeat = addUserToTable(tableForCurrentUser, currentUser)
    //   if (currentSeat > -1) {
    //     moveUserToTable(tableForCurrentUser as ITable)
    //   }
    // }
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

    //   const newTable = tableById(tableId);

    const users = usersOnTable(tableId);
    if (users.length >= MAX_USERS_ON_TABLE) {
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
        {TABLES.map((table) =>
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
