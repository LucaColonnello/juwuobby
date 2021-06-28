import { useAtom } from "jotai";
import { atomWithDefault, RESET } from "jotai/utils";

import { openedPlaylistIdAtom } from './openedPlaylist';
import { Playlist, PlaylistID } from "../types";

// TODO: fix type, it should be about the songs
type OpenedPlaylistSongs = Partial<Playlist> | false | null;

export const asyncOpenedPlaylistSongsAtom = atomWithDefault<OpenedPlaylistSongs>(async (get) => {
  const openedPlaylistId = get(openedPlaylistIdAtom);

  return null;
});
asyncOpenedPlaylistSongsAtom.onMount = (set) => {
  return () => {
    set(RESET);
  }
};

interface UseOpenedPlaylistOps {
  setOpenedPlaylist: (playlistId: PlaylistID) => void;
  reset: () => void;
}

export default function useOpenedPlaylistSongs(): [
  OpenedPlaylistSongs,
  UseOpenedPlaylistOps
] {
  const [openedPlaylistSongs, setOpenedPlaylist] = useAtom(asyncOpenedPlaylistSongsAtom);

  return [
    openedPlaylistSongs,
    {
      setOpenedPlaylist() {
        setOpenedPlaylist();
      },
      reset() {
        setOpenedPlaylist(RESET);
      }
    }
  ];
}
