import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut, signInWithEmailAndPassword,  } from 'firebase/auth';
import { addDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';

import{
  getFirestore,
 } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCEAqWutvG4Rh3fEUSk7Y0q1CLmoZCKFtA",
  authDomain: "wecedmerced-6c516.firebaseapp.com",
  projectId: "wecedmerced-6c516",
  storageBucket: "wecedmerced-6c516.appspot.com",
  messagingSenderId: "408101021353",
  appId: "1:408101021353:web:341490355079c74e2f6bb8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//==== FIREBASE AUTH ====
export function createAccount(username, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredentials) => {
    updateProfile(userCredentials.user, { displayName: username });
  })
  .catch((error) => {
    alert(error);
  });
}

export function signInUser(email, password) {
  signInWithEmailAndPassword(auth, email, password).catch((error)=>{
    alert(error);
  })
}

export function signOutUser() {
  signOut(auth).catch((error) => {
    alert(error);
  });
}

export function updateOnAuthStateChanged(callback) {
  onAuthStateChanged(auth, callback);
}

//===== Comment =======
export function dbAddComment(userID, username, comment) {
  if (comment.trim() !== '') {
    addDoc(collection(db, 'comments'), {
      comment: comment,
      timestamp: Date.now(),
      userID: userID,
      username: username,
    }).catch((error) => {
      alert(error);
    });
  }
}

export function updateOnSnapshot(callback) {
  const q = query(collection(db, 'comments'), orderBy('timestamp', 'desc'));
	onSnapshot(q, callback)
}