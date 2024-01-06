import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyA6A0a_1pqxtbkRSQ70a7vALUk1YIhMJng",
    authDomain: "social-cool-91927.firebaseapp.com",
    projectId: "social-cool-91927",
    storageBucket: "social-cool-91927.appspot.com",
    messagingSenderId: "426497090703",
    appId: "1:426497090703:web:8b27a7e03128c0bd7b7cfa"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;