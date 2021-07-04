import { useAtom } from "jotai";
import { atomWithDefault, RESET } from "jotai/utils";

import { openedPlaylistIdAtom } from './openedPlaylist';
import { PlaylistSongs, PlaylistID, State } from "../types";

// TODO: fix type, it should be about the songs
type OpenedPlaylistSongs = PlaylistSongs | false | null;

export const asyncOpenedPlaylistSongsAtom = atomWithDefault<OpenedPlaylistSongs>(async (get) => {
  const openedPlaylistId = get(openedPlaylistIdAtom);

  return null;
});
asyncOpenedPlaylistSongsAtom.onMount = (set) => {
  return () => {
    set(RESET);
  }
};

interface UseOpenedPlaylistSongsOps {
  setOpenedPlaylistSongs: (playlistSongs: PlaylistSongs) => void;
  reset: () => void;
}

export default function useOpenedPlaylistSongs(): State<
  { openedPlaylistSongs: OpenedPlaylistSongs },
  UseOpenedPlaylistSongsOps
> {
  const [openedPlaylistSongs, setOpenedPlaylistSongs] = useAtom(asyncOpenedPlaylistSongsAtom);

  return [
    { openedPlaylistSongs },
    {
      setOpenedPlaylistSongs() {
        setOpenedPlaylistSongs();
      },
      reset() {
        setOpenedPlaylistSongs(RESET);
      }
    }
  ];
}
