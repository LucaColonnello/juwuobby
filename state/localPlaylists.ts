import { atom } from "jotai";

import * as LocalPlaylistsRepository from "../repositories/LocalPlaylists";
import { Playlist } from "../types";

const localPlaylists = atom([]);

export const asyncLocalPlaylists = atom(
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
