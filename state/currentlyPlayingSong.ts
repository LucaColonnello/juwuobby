import { atom, useAtom } from "jotai";

import { Song, State } from "../types";

type CurrentlyPlayingSong = Song | null;

export const currentlyPlayingSongAtom = atom<CurrentlyPlayingSong, CurrentlyPlayingSong>(null, null);
currentlyPlayingSongAtom.onMount = (set) => {
  return () => {
    set(null);
  }
};

interface UseCurrentlyPlayingSongOps {
  setCurrentlyPlayingSong: (currentlyPlayingSong: Song) => void;
}

export default function useCurrentlyPlayingSong(): State<
  { currentlyPlayingSong: CurrentlyPlayingSong },
  UseCurrentlyPlayingSongOps
> {
  const [currentlyPlayingSong, setCurrentlyPlayingSong] = useAtom(currentlyPlayingSongAtom);

  return [
    { currentlyPlayingSong },
    {
      setCurrentlyPlayingSong(currentlyPlayingSong) {
        setCurrentlyPlayingSong(currentlyPlayingSong);
      },
    }
  ];
}
