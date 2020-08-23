import React, { useEffect, useState } from 'react';
import './Theater.scss';
import MapImage from '../assets/conference-map.svg';
import TableConfig from './tableConfig.json';
import TableComponent from './Table';
import Firebase from '../services/firebase';
import { useHistory } from 'react-router-dom';
import { IUser, ITable } from './types';
import MockData from '../utils/mockData';
import { placeUserToTables, addUserToTable, findTableById, removeUserFromTable } from '../utils/arrange'

const defaultUser: IUser = {
  id: 'id_unknown',
  name: 'Guess who?'
}

const defaultTable: ITable = {
  id: 'id_unknown',
}

const TABLES = TableConfig.tables || []; // Todo: move to fetch
const USERS = MockData.users || []; // Todo: move to fetch
const TABLES_WITH_USERS = placeUserToTables(USERS, TABLES) || []

const Theater: React.FC = () => {
  const history = useHistory();
  const [user, setUser] = useState<IUser>(defaultUser) // Current user
  const [table, setTable] = useState<ITable>(defaultTable)  // Table where Current user is sit
  const tables: ITable[] = TABLES_WITH_USERS;

  useEffect(() => {
    Firebase.auth().onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser({
          id: currentUser.uid,
          uid: currentUser.uid,
          idToken: await currentUser.getIdToken(),
          email: String(currentUser.email),
          name: String(currentUser.displayName),
          avatar: String(currentUser.photoURL),
        })
      } else {
        setUser(defaultUser)
      }
    })
  }, [])

  const handleLogout = async () => {
    await Firebase.auth().signOut();
    history.push('/');
  }

  function tableDoubleClick(tableId: string) {
    const newTable = findTableById(tables, tableId);
    if (newTable === table) {
      console.log(`Current user is already sitting on "${tableId}" table`)
      return;
    }

    // Try to add Current User to new table
    const newSeatIndex = addUserToTable(newTable, user);
    if (newSeatIndex < 0) {
      // No free seats on that table
      alert(`No free seats on "${tableId}" table!`);
      return;
    }

    // Current User added successfully
    if (table) {
      // Remove Current User from old table
      removeUserFromTable(table, user);
    }
    setTable(newTable as ITable)
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
        {tables.map((table) => <TableComponent key={table.id} {...table} onDoubleClick={() => tableDoubleClick(table.id)} />)}
      </div>
      <div className="rt-background">
        <img src={MapImage} alt="Conference background" />
      </div>
    </div >
  );
};

export default Theater;
