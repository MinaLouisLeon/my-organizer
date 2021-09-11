import { db } from "./index";
import { doc, setDoc , getDocs , collection } from "firebase/firestore";

export const addToDatabase = async (path, document, data, userUID) => {
  await setDoc(doc(db, path, document), data);
};

export const getFromDatabase = async (path) => {
  const querySnapshot = await getDocs(collection(db,path));
  let myData = [];
  querySnapshot.forEach((doc) => {
    myData.push({
      id : parseInt(doc.id),
      data : doc.data()
    })
  })
  return myData
}
