import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"


    const firebaseConfig = {
        apiKey: "AIzaSyBBopnU8FcxMXFzLV17ezzLjZ-I--4RAUo",
        authDomain: "my-organizer-fcdfa.firebaseapp.com",
        projectId: "my-organizer-fcdfa",
        storageBucket: "my-organizer-fcdfa.appspot.com",
        messagingSenderId: "158782845138",
        appId: "1:158782845138:web:03fc342cce91057b78bd0b",
        measurementId: "G-MHKQN0GRJC",
      };

    export  const app = initializeApp(firebaseConfig);
    export const db = getFirestore();