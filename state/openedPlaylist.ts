import { atom, useAtom } from "jotai";

import { asyncLocalPlaylistsAtom } from './localPlaylists';
import { Playlist, PlaylistID, State } from "../types";

type OpenedPlaylist = Partial<Playlist> | false | null;

export const openedPlaylistIdAtom = atom<PlaylistID, PlaylistID>(null, null);
openedPlaylistIdAtom.onMount = (set) => {
  // reset on unmount
  return () => {
    set(null);
  };
};

export const openedPlaylistAtom = atom<OpenedPlaylist>(
  (get) => {
    const openedPlaylistId = get(openedPlaylistIdAtom);
    const localPlaylists = get(asyncLocalPlaylistsAtom);

    if (localPlaylists === null) {
      return null;
    }

    return localPlaylists?.find(({ id }) => id === openedPlaylistId) || false;
  }
);

interface UseOpenedPlaylistOps {
  setOpenedPlaylist: (playlistId: PlaylistID) => void;
}

export default function useOpenedPlaylist(): State<OpenedPlaylist, UseOpenedPlaylistOps> {
  const [_, setOpenedPlaylistId] = useAtom(openedPlaylistIdAtom);
  const [openedPlaylist] = useAtom(openedPlaylistAtom);

  return [
    openedPlaylist,
    {
      setOpenedPlaylist(playlistId) {
        setOpenedPlaylistId(playlistId);
      },
    }
  ];
}
