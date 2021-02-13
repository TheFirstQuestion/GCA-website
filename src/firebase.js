import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBpxU23CO0qhSXEwhe0KimIDfEnvGZI4II",
  authDomain: "digital-traces-project.firebaseapp.com",
  projectId: "digital-traces-project",
  storageBucket: "digital-traces-project.appspot.com",
  messagingSenderId: "478692864215",
  appId: "1:478692864215:web:84c3ed0c74f8fdc51a8092",
  measurementId: "G-XP5P2PWSF3"
};
firebase.initializeApp(config);
firebase.analytics();
export default firebase;

