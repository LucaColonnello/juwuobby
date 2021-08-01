import { auth, firebase } from "../../firebase";

export default function listenForAuthStateChanges(callback: (user: firebase.User) => void) {
  auth.onAuthStateChanged((user) => {
    callback(user);
  });
}
