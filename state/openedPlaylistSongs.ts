import { atom, useAtom } from "jotai";

import { PlaylistSongs, State } from "../types";

type OpenedPlaylistSongs = PlaylistSongs | null;

export const openedPlaylistSongsAtom = atom<OpenedPlaylistSongs, OpenedPlaylistSongs>(null, null);
openedPlaylistSongsAtom.onMount = (set) => {
  return () => {
    set(null);
  }
};

interface UseOpenedPlaylistSongsOps {
  setOpenedPlaylistSongs: (playlistSongs: PlaylistSongs) => void;
}

export default function useOpenedPlaylistSongs(): State<
  { openedPlaylistSongs: OpenedPlaylistSongs },
  UseOpenedPlaylistSongsOps
> {
  const [openedPlaylistSongs, setOpenedPlaylistSongs] = useAtom(openedPlaylistSongsAtom);

  return [
    { openedPlaylistSongs },
    {
      setOpenedPlaylistSongs(playlistSongs: PlaylistSongs) {
        setOpenedPlaylistSongs(playlistSongs);
      },
    }
  ];
}
