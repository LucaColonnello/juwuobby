import { atom, useAtom } from "jotai";

import type { Playlist, State } from "../types";

type OpenedPlaylist = Playlist | false | null;

export const openedPlaylistAtom = atom<OpenedPlaylist, OpenedPlaylist>(null, null);
openedPlaylistAtom.onMount = (set) => {
  // reset on unmount
  return () => {
    set(null);
  };
};

interface UseOpenedPlaylistOps {
  setOpenedPlaylist: (playlist: OpenedPlaylist) => void;
}

export default function useOpenedPlaylist(): State<OpenedPlaylist, UseOpenedPlaylistOps> {
  const [openedPlaylist, setOpenedPlaylist] = useAtom(openedPlaylistAtom);

  return [
    openedPlaylist,
    {
      setOpenedPlaylist(playlist) {
        setOpenedPlaylist(playlist);
      },
    }
  ];
}
