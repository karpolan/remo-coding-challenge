import React, { useEffect, useState } from 'react';
import './Theater.scss';
import MapImage from '../assets/conference-map.svg';
import TableConfig from './tableConfig.json';
import TableComponent from './Table';
import Firebase from '../services/firebase';
import { useHistory } from 'react-router-dom';
import { IUser, ITable } from './types';
import MockData from './mockData';
import { placeUserToTables } from '../utils'

const defaultUser: IUser = {
  id: 'id_unknown',
  name: 'Guess who?'
}

const TABLES = TableConfig.tables || []; // Todo make in static outside the component or move to fetch
const USERS = MockData.users || []; // Todo make in static outside the component or move to fetch

const TABLES_WITH_USERS = placeUserToTables(USERS, TABLES) || []


const Theater: React.FC = () => {
  const history = useHistory();
  const [user, setUser] = useState<IUser>(defaultUser)
  const tablesWithUsers: ITable[] = TABLES_WITH_USERS;

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

  return (
    <div className="remo-theater" style={{ width: TableConfig.width, height: TableConfig.height }}>
      <div className="rt-app-bar">
        <div className='user'>
          {user.avatar ? <div className='avatar'><img src={user.avatar} title={user.name} /></div> : null}
          <h5 >{user.name}</h5>
          {Boolean(user.email) && <h6 >{user.email}</h6>}
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="rt-rooms">
        {tablesWithUsers.map((table) => <TableComponent key={table.id} {...table} />)}
      </div>
      <div className="rt-background">
        <img src={MapImage} alt="Conference background" />
      </div>
    </div >
  );
};

export default Theater;
