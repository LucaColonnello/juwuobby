import { auth, firebase } from "../../firebase";

export default async function loginAsGuest(): Promise<firebase.User> {
  const result = await auth.signInAnonymously();
  return result.user;
}
