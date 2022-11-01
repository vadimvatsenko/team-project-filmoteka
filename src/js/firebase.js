// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { DataSnapshot } from 'firebase/database';
import { Notify } from 'notiflix';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDvv5PycN4kbGM1af5rztIhaPxClibdGkI',
  authDomain: 'movie-library-f19a1.firebaseapp.com',
  databaseURL:
    'https://movie-library-f19a1-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'movie-library-f19a1',
  storageBucket: 'movie-library-f19a1.appspot.com',
  messagingSenderId: '656331557206',
  appId: '1:656331557206:web:32c32919809f371aefaef7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
export function createUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      Notify.success(`Succes! Your email: ${email}`);
      signInWithEmailAndPassword(auth, email, password)
        .then(data => {
          console.log(data);
        })
        .catch(e => {
          console.log(error);
        });
      return user;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/email-already-in-use') {
        Notify.failure('Email already in use!');
      }
    });
}

// const DataSnap = new DataSnapshot();
// const res = DataSnap.res;
// console.log(res);
// console.log(DataSnap.toJSON());

export function getAllData() {
  getDatabase();
}

// createUserWithEmailAndPassword(auth, 'arturtretyak1990@gmail.com', 'Test12345')
//   .then(userCredential => {
//     // Signed in
//     const user = userCredential.user;
//     console.log(user);
//     // ...
//   })
//   .catch(error => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log(error);
//     // ..
//   });
