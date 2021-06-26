import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDbQKtWU7N6jnFs_tUOnk7Gd7EQqWjWrdw',
  authDomain: 'nextjs-oneonone-chat.firebaseapp.com',
  projectId: 'nextjs-oneonone-chat',
  storageBucket: 'nextjs-oneonone-chat.appspot.com',
  messagingSenderId: '614971321707',
  appId: '1:614971321707:web:9bec532e07e861da31702e',
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
