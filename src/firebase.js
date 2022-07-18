import firebase from "firebase/app";
import "firebase/firestore";
// Contains sensitive information, so you have to create this file yourself
import { firebaseConfig } from "./config.js";

firebase.initializeApp(firebaseConfig);
export default firebase;
