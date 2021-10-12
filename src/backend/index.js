import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  //add firebase configuration

};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
