import { atom, useAtom } from "jotai";

import * as LocalPlaylistsRepository from "../repositories/LocalPlaylists";
import { Playlist, PlaylistID } from "../types";

type PlaylistCollection = Partial<Playlist>[] | null;

const localPlaylistsAtom = atom<PlaylistCollection, PlaylistCollection>(null, null);

export const asyncLocalPlaylistsAtom = atom<PlaylistCollection, PlaylistCollection>(
  (get) => get(localPlaylistsAtom),
  (get, set, playlists: Partial<Playlist>[]) => {
    const persist = async () => {
      await LocalPlaylistsRepository.saveLocalPlaylists(playlists);
    };
    persist().then().catch();

    set(localPlaylistsAtom, playlists);
  }
);
localPlaylistsAtom.onMount = (setLocalPlaylists) => {
  const setInitialValue = async () => {
    setLocalPlaylists(
      (await LocalPlaylistsRepository.getLocalPlaylists()) || []
    );
  };

  setInitialValue();
};

interface UseLocalPlaylistsOps {
  addLocalPlaylist: (newPlaylist: Partial<Playlist>) => void;
  deleteLocalPlaylistById: (playlistId: PlaylistID) => void;
}

export default function useLocalPlaylists(): [
  Partial<Playlist>[] | null,
  UseLocalPlaylistsOps
] {
  const [localPlaylists, setLocalPlaylists] = useAtom(asyncLocalPlaylistsAtom);

  return [
    localPlaylists,
    {
      addLocalPlaylist(newPlaylist: Partial<Playlist>) {
        setLocalPlaylists([...(localPlaylists || []), newPlaylist]);
      },
      deleteLocalPlaylistById(playlistId: PlaylistID) {
        const copy = localPlaylists.slice(0);
        const indexToDelete = localPlaylists.findIndex(
          ({ id }) => id === playlistId
        );

        if (indexToDelete !== -1) {
          copy.splice(indexToDelete, 1);
          setLocalPlaylists(copy);
        }
      }
    }
  ];
}
