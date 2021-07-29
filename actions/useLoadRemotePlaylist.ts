import * as PlaylistsRepository from "../repositories/Playlists";
import useOpenedPlaylist from "../state/openedPlaylist";

import type { Action, PlaylistID } from "../types";

export default function useLoadRemotePlaylist(): Action<
  (playlistId: PlaylistID) => Promise<void>
> {
  const [, { setOpenedPlaylist }] = useOpenedPlaylist();

  return async function loadRemotePlaylist(playlistId) {
    let playlist = await PlaylistsRepository.getPlaylistById(playlistId);
    if (playlist === null) {
      setOpenedPlaylist(false);
      return;
    }
    
    setOpenedPlaylist(playlist);
  };
}
