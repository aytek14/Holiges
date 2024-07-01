import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDXMeCUDyo6KW1H3BDKQJwMDiQ5cfN77lQ",
  authDomain: "holiges.firebaseapp.com",
  projectId: "holiges",
  storageBucket: "holiges.appspot.com",
  messagingSenderId: "1054796602273",
  appId: "1:1054796602273:web:28682be3eeff20e93e89e0",
  measurementId: "G-PSWMN982ZT",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;
console.log("Analytics initialized:", !!analytics);

export { db, auth, storage };
