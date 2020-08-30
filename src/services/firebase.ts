import * as firebase from 'firebase';

// TODO: fill in your firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyB1XKorEHtsJy-H5pAHWIqyXbTMomf9Jn4',
  authDomain: 'remo-coding-challenge-1-c3dc1.firebaseapp.com',
  databaseURL: 'https://remo-coding-challenge-1-c3dc1.firebaseio.com',
  projectId: 'remo-coding-challenge-1-c3dc1',
  storageBucket: 'remo-coding-challenge-1-c3dc1.appspot.com',
  messagingSenderId: '71933339514',
  appId: '1:71933339514:web:9b0d06013a6e73536298c3',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
