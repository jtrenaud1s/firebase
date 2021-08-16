import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"
import config from "../config/config";

const Firebase = firebase.initializeApp(config.firebase);

export const Providers = {
  standard: new firebase.auth.EmailAuthProvider(),
  google: new firebase.auth.GoogleAuthProvider(),
  facebook: new firebase.auth.FacebookAuthProvider(),
};

export const storage = firebase.storage().ref()
export const profilePicturesRef = storage.child("images")

export const getUser = (uid: string) => Firestore.doc(`users/${uid}`);
export const getUsers = () => Firestore.collection("users");
export const getRole = (role: string) => Firestore.doc(`roles/${role}`);
export const getRoles = () => Firestore.collection(`roles`);
export const auth = firebase.auth();
export const Firestore = firebase.firestore();
export default Firebase;
