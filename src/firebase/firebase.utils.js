import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBpW7fr5rGDf5G9b9AY8Yv5rcPVfyWNDhM",
  authDomain: "e-commerce-2692f.firebaseapp.com",
  databaseURL: "https://e-commerce-2692f.firebaseio.com",
  projectId: "e-commerce-2692f",
  storageBucket: "e-commerce-2692f.appspot.com",
  messagingSenderId: "481650315804",
  appId: "1:481650315804:web:5cfd0a7267147a949b05d9",
  measurementId: "G-FY8QL36CMW",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
