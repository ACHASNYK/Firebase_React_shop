// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/app";
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBxmtHEkLin9yDRdGeE25RmbIBRskei1Hw",
  authDomain: "uzhgorod-first.firebaseapp.com",
  projectId: "uzhgorod-first",
  storageBucket: "uzhgorod-first.appspot.com",
  messagingSenderId: "87076288518",
  appId: "1:87076288518:web:6ab82b1442ddf69cecab87",
  measurementId: "G-1P2BK0ZB5E"
};

firebase.initializeApp(firebaseConfig);

const projFirestore = firebase.firestore();

export { projFirestore };