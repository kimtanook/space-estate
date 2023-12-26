import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyARsA57Hg27rGF0XNUUxEv2jkF6QXfGMBw",
  authDomain: "d-test-e64af.firebaseapp.com",
  projectId: "d-test-e64af",
  storageBucket: "d-test-e64af.appspot.com",
  messagingSenderId: "137648454956",
  appId: "1:137648454956:web:7057b84dd8551ca2030089",
};

const app = initializeApp(firebaseConfig);
const authService = getAuth(app);
const dbService = getFirestore(app);
const storageService = getStorage(app);
export {app, authService, dbService, storageService};
