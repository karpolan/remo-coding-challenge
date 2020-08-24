import React, { useEffect } from 'react';
import Firebase from '../services/firebase';
import { useHistory } from 'react-router-dom';
// import { apiPostCurrentUser } from '../apis';

const Auth: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    Firebase.auth().onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        // Don't save user data here, if clears tableId
        // apiPostCurrentUser({
        //   id: currentUser.uid,
        //   uid: currentUser.uid,
        //   idToken: await currentUser.getIdToken(),
        //   email: String(currentUser.email),
        //   name: String(currentUser.displayName),
        //   avatar: String(currentUser.photoURL),
        // })
        console.log('Logged User:', currentUser)
        history.push('/theater');
      }
    });
  }, [/*history*/]);

  const redirect = () => {
    const provider = new Firebase.auth.GoogleAuthProvider();
    Firebase.auth().signInWithPopup(provider);
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <h1> Remo Coding Challenge Join Room </h1>
      <button onClick={redirect}> Login With Google </button>
    </div>
  );
};

export default Auth;