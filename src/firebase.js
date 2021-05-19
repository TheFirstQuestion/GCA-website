import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBARurBcuPfg3SWhuI1Ry1WqPFn7IgORN0",
  authDomain: "claire-dtp-project.firebaseapp.com",
  projectId: "claire-dtp-project",
  storageBucket: "claire-dtp-project.appspot.com",
  messagingSenderId: "348955792385",
  appId: "1:348955792385:web:18c5d1981ab2e4b7b85c00",
  measurementId: "G-SLLS5K68LD"
};

firebase.initializeApp(config);
firebase.analytics();
//firebase.firestore().enablePersistence();
export default firebase;

