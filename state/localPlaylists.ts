import { atom, useAtom } from "jotai";

import * as LocalPlaylistsRepository from "../repositories/LocalPlaylists";
import { Playlist, PlaylistID } from "../types";

type PlaylistCollection = Partial<Playlist>[] | null;

const localPlaylists = atom<PlaylistCollection, PlaylistCollection>(null, null);

export const asyncLocalPlaylists = atom<PlaylistCollection, PlaylistCollection>(
  (get) => get(localPlaylists),
  (get, set, playlists: Partial<Playlist>[]) => {
    const persist = async () => {
      await LocalPlaylistsRepository.saveLocalPlaylists(playlists);
    };
    persist().then().catch();

    set(localPlaylists, playlists);
  }
);
localPlaylists.onMount = (setLocalPlaylists) => {
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
  getLocalPlaylistById: (playlistId: PlaylistID) => Partial<Playlist>;
}

export default function useLocalPlaylists(): [
  Partial<Playlist>[] | null,
  UseLocalPlaylistsOps
] {
  const [localPlaylists, setLocalPlaylists] = useAtom(asyncLocalPlaylists);

  return [
    localPlaylists,
    {
      getLocalPlaylistById(playlistId: PlaylistID): Partial<Playlist> {
        return localPlaylists?.find(({ id }) => id === playlistId);
      },
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
