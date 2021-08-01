import { atom, useAtom } from "jotai";

import type { User, State } from "../types";

type LoggedInUser = User | false | null;

export const loggedInUserAtom = atom<LoggedInUser, LoggedInUser>(null, null);

interface UseLoggedInUserOps {
  setLoggedInUser: (user: LoggedInUser) => void;
}

export default function useLoggedInUser(): State<LoggedInUser, UseLoggedInUserOps> {
  const [loggedInUser, setLoggedInUser] = useAtom(loggedInUserAtom);

  return [
    loggedInUser,
    {
      setLoggedInUser(user) {
        setLoggedInUser(user);
      },
    }
  ];
}
