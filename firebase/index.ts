import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

try {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    storageBucket: "juwuobby.appspot.com",
  });
} catch (e) {
  console.error(e);
}

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth, firebase };
