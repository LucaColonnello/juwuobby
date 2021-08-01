import { auth } from "../../firebase";

export default async function logout() {
  await auth.signOut();
}
