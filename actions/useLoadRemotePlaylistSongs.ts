import * as PlaylistsRepository from "../repositories/Playlists";
import useOpenedPlaylist from "../state/openedPlaylist";
import useOpenedPlaylistSongs from "../state/openedPlaylistSongs";

import type { Action } from "../types";

export default function useLoadRemotePlaylistSongs(): Action<() => Promise<void>> {
  const [openedPlaylist] = useOpenedPlaylist();
  const [, { setOpenedPlaylistSongs }] = useOpenedPlaylistSongs();

  return async function loadRemotePlaylistSongs() {
    if (openedPlaylist === false || openedPlaylist === null) {
      return;
    }

    let playlistSongs = await PlaylistsRepository.getPlaylistSongs(openedPlaylist.id);
    if (playlistSongs === null) {
      return;
    }

    setOpenedPlaylistSongs(playlistSongs);
  };
}
