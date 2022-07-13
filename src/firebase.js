import firebase from "firebase/app";
import "firebase/firestore";
// Contains sensitive information, so you have to create this file yourself
import { config } from "./config.js";

firebase.initializeApp(config);
export default firebase;
