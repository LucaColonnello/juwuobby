import * as FirebaseAuth from "../utils/FirebaseAuth";

import type { Action } from "../types";

export default function useLogout(): Action<() => Promise<void>> {
  return async function logout() {
    await FirebaseAuth.logout();
  };
}
