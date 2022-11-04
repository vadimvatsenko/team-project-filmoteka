import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { Notify } from 'notiflix';

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
const db = getFirestore(app);
const auth = getAuth();

export async function createUser(email, password) {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error.code === 'auth/weak-password') {
      Notify.failure('Password should be at least 6 characters ');
    }
    if (error.code === 'auth/invalid-email') {
      Notify.failure('Email invalid!');
    }
    if (error.code === 'auth/email-already-in-use') {
      Notify.failure('Email already in use!');
    }
    if (error.code === 'auth/internal-error') {
      Notify.failure('Input all please!');
    }

    console.log(error);
    return error;
  }
}

export async function singInAccount(email, password) {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    if (error.code === 'auth/wrong-password') {
      Notify.failure('Wrong password!');
    }
    if (error.code === 'auth/too-many-requests') {
      Notify.failure(
        'Too many wrong passwords. Please wait 30 min before trying!'
      );
    }
    if (error.code === 'auth/user-not-found') {
      Notify.failure('User not found!');
    }
    if (error.code === 'auth/invalid-email') {
      Notify.failure('Email invalid!');
    }
    if (error.code === 'auth/internal-error') {
      Notify.failure('Input all please!');
    }
  }
}

// add new user. user is object with email and id. Usualy get from local storage
export async function createNewUser(user) {
  const users = collection(db, 'users');
  await setDoc(doc(users, user.id), {
    email: user.email,
    watched: [],
    queue: [],
  });
}

// get object with info about client {email,watched,queue}. id from local storage.
export async function getUserInfo(id) {
  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);

  // if (docSnap.exists()) {
  return docSnap.data();
  // } else {
  //   console.log('No such document!');
  // }
}

export async function getWatchedFb(id) {
  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const result = docSnap.data().watched;
    localStorage.setItem('WatchedFb', result.length);
    return docSnap.data().watched;
  } else {
    console.log('No such document!');
    localStorage.setItem('WatchedFb', 0);
    return null;
  }
}

export async function addToWatchedFb(userId, filmId) {
  const docRef = doc(db, 'users', userId);
  const watched = await getWatchedFb(userId);
  if (watched.includes(filmId)) {
    return { result: false, message: `${filmId} already in array!` };
  }
  if (watched) {
    watched.push(filmId);
    await updateDoc(docRef, {
      watched: watched,
    });
    return { result: true, message: `${filmId} was add in watched.` };
  } else {
    console.log('None list');
  }
}

export async function removeFromWatchedFb(userId, filmId) {
  const docRef = doc(db, 'users', userId);
  const watched = await getWatchedFb(userId);
  const index = watched.indexOf(filmId);

  if (index >= 0) {
    watched.splice(index, 1);
    await updateDoc(docRef, {
      watched: watched,
    });
    return { result: true, message: `${filmId} was delete from watched!` };
  }
  return { result: false, message: `${filmId} was not found in watched!` };
}

export async function getQueueFb(id) {
  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const result = docSnap.data().queue;
    localStorage.setItem('QueueFb', result.length);
    return docSnap.data().queue;
  } else {
    console.log('No such document!');
    localStorage.setItem('QueueFb', 0);
    return null;
  }
}

export async function addToQueueFb(userId, filmId) {
  const docRef = doc(db, 'users', userId);
  const queue = await getQueueFb(userId);
  if (queue.includes(filmId)) {
    return { result: false, message: `${filmId} already in array!` };
  }
  if (queue) {
    queue.push(filmId);
    await updateDoc(docRef, {
      queue: queue,
    });
    return { result: true, message: `${filmId} was add in queue.` };
  } else {
    console.log('None list');
  }
}

export async function removeFromQueueFb(userId, filmId) {
  const docRef = doc(db, 'users', userId);
  const queue = await getQueueFb(userId);
  const index = queue.indexOf(filmId);

  if (index >= 0) {
    queue.splice(index, 1);
    await updateDoc(docRef, {
      queue: queue,
    });
    return { result: true, message: `${filmId} was delete from queue!` };
  }
  return { result: false, message: `${filmId} was not found in queue!` };
}
