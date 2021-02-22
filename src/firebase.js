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


//DTP TEMP
/*const config = {
  apiKey: "AIzaSyBdLBQGIFMUyu5t3Ng067dHNsKGx__Y-gY",
  authDomain: "dtp-test-ce82f.firebaseapp.com",
  projectId: "dtp-test-ce82f",
  storageBucket: "dtp-test-ce82f.appspot.com",
  messagingSenderId: "522551435710",
  appId: "1:522551435710:web:01c61c6b4901b4793bd9ef",
  measurementId: "G-C570999S98"
}*/
firebase.initializeApp(config);
firebase.analytics();
export default firebase;

