import { useEffect } from "react";

import * as FirebaseAuth from "../utils/FirebaseAuth";
import useLoggedInUser from "../state/loggedInUser";

import type { Effect } from "../types";
import { createUser } from "../domain/entities/user";

const useAuthSubscription: Effect<() => void> = () => {
  const [, { setLoggedInUser }] = useLoggedInUser();

  useEffect(() => {
    FirebaseAuth.listenForAuthStateChanges((user) => {
      if (user === null) {
        setLoggedInUser(false);
        return;
      }

      const loggedInUser = createUser(user.uid, user.displayName, user.email);
      setLoggedInUser(loggedInUser);
    });
  }, []);
};

export default useAuthSubscription;
