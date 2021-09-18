import { db } from "./index";

import {
  doc,
  setDoc,
  getDocs,
  collection,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export const updateTaskName = async (path, document, data) => {
  const updateTaskNameDocRef = doc(db, path, document);
  await updateDoc(updateTaskNameDocRef, {
    name: data,
  });
  return getFromDatabase(path);
};

export const updateTaskDate = async (path, document, start, end) => {
  const updateTaskDateDocRef = doc(db, path, document);
  await updateDoc(updateTaskDateDocRef, {
    start: start,
    end: end,
  });
  return getFromDatabase(path);
};

export const updateTaskLink = async (path, document, start, end) => {
  const updateTaskLinkDocRef = doc(db, path, document);
  await updateDoc(updateTaskLinkDocRef, {
    start: start,
    end: end,
  });
  return getFromDatabase(path);
};

export const editTask = async (path,document,name,color,note) => {
  const editTaskRef = doc(db,path,document);
  await updateDoc(editTaskRef,{
    name : name,
    color : color,
    note : note
  });
  return getFromDatabase(path);
}

export const addToDatabase = async (path, document, data) => {
  await setDoc(doc(db, path, document), data);
  return getFromDatabase(path);
};

export const deleteFromDatabase = async (path, document) => {
  await deleteDoc(doc(db, path, document));
  return getFromDatabase(path);
};

export const createNewUser = async () => {
  await setDoc(doc(db,"user1/userData/Projects","project 1"),{})
}

export const getFromDatabase = async (path) => {
  const querySnapshot = await getDocs(collection(db, path));
  let myData = [];
  querySnapshot.forEach((doc) => {
    myData.push({
      id: parseInt(doc.id),
      data: doc.data(),
    });
  });
  return myData;
};
