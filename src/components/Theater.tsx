// import * as React from 'react';
import React, { useEffect, useState } from 'react';

import './Theater.scss';
import MapImage from '../assets/conference-map.svg';
import TableConfig from './tableConfig.json';
import Table from './Table';
import Firebase from '../services/firebase';
import { useHistory } from 'react-router-dom';

interface User {
  uid?: string,
  idToken?: string;
  email?: string;
  name?: string;
  avatar?: string;
}

const defaultUser: User = {
  name: 'Guess who?'
}

const Theater: React.FC = () => {
  const history = useHistory();
  const [user, setUser] = useState<User>(defaultUser)
  const listTables = TableConfig.tables || [];

  useEffect(() => {
    Firebase.auth().onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser({
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

  console.log('user:', user);

  return (
    <div className="remo-theater" style={{ width: TableConfig.width, height: TableConfig.height }}>
      <div className="rt-app-bar">
        <div className='user'>
          {user.avatar ? <div className='avatar'><img src={user.avatar} /></div> : null}
          <h5 >{user.name}</h5>
          {Boolean(user.email) && <h6 >{user.email}</h6>}
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="rt-rooms">
        {listTables.map((table) => <Table key={table.id} {...table} />)}
      </div>
      <div className="rt-background">
        <img src={MapImage} alt="Conference background" />
      </div>
    </div >
  );
};

export default Theater;
