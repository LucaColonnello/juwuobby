import * as FirebaseAuth from "../utils/FirebaseAuth";

import type { Action } from "../types";

export default function useLoginAsGuest(): Action<() => Promise<void>> {
  return async function loginAsGuest() {
    await FirebaseAuth.loginAsGuest();
  };
}
