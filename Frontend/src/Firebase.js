import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDafupXKjxYtlvkBtPU0LZzzqCCqIJTPH8",
    authDomain: "nawsociale.firebaseapp.com",
    projectId: "nawsociale",
    storageBucket: "nawsociale.appspot.com",
    messagingSenderId: "191827451318",
    appId: "1:191827451318:web:cfd0923d14f680d837b517",
    measurementId: "G-1G0Q9TNYHG"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;