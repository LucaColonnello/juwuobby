import { useAtom } from "jotai";
import { atomWithDefault, RESET } from "jotai/utils";

import { openedPlaylistIdAtom } from './openedPlaylist';
import { PlaylistSongs, State } from "../types";

type OpenedPlaylistSongs = PlaylistSongs | null;

export const asyncOpenedPlaylistSongsAtom = atomWithDefault<OpenedPlaylistSongs>(async (get) => {
  const openedPlaylistId = get(openedPlaylistIdAtom);

  // TODO: use local repository to get playlist songs by playlist id
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
      setOpenedPlaylistSongs(playlistSongs: PlaylistSongs) {
        setOpenedPlaylistSongs(playlistSongs);
      },
      reset() {
        setOpenedPlaylistSongs(RESET);
      }
    }
  ];
}
