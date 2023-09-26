import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC5L2AjRt8nufLBy53z2hEVzDOeUXSikK4",
  authDomain: "chatapp-react-a5298.firebaseapp.com",
  databaseURL: "https://chatapp-react-a5298-default-rtdb.firebaseio.com",
  projectId: "chatapp-react-a5298",
  storageBucket: "chatapp-react-a5298.appspot.com",
  messagingSenderId: "584394298826",
  appId: "1:584394298826:web:aa469c3a5893d00b4a2b33",
};

const app = initializeApp(firebaseConfig);

//Making connections to the firebase store
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
