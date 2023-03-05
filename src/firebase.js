import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

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
export const firestore = getFirestore(app);