import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyBJo7t5Y7JCFo9YUn9zlg3LzlJFdA1kZuI",
    authDomain: "react-social-ff1fe.firebaseapp.com",
    projectId: "react-social-ff1fe",
    storageBucket: "react-social-ff1fe.appspot.com",
    messagingSenderId: "25623315576",
    appId: "1:25623315576:web:c8b664cb994102d32e598d"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);


const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();
const provider = new firebase.auth.GoogleAuthProvider();


export { db, auth, storage, provider };