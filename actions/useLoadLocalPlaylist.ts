import * as LocalPlaylistsRepository from "../repositories/LocalPlaylists";
import useOpenedPlaylist from "../state/openedPlaylist";

import type { Action, PlaylistID } from "../types";

export default function useLoadLocalPlaylist(): Action<
  (playlistId: PlaylistID) => Promise<void>
> {
  const [, { setOpenedPlaylist }] = useOpenedPlaylist();

  return async function loadLocalPlaylist(playlistId) {
    let localPlaylists = await LocalPlaylistsRepository.getLocalPlaylists();
    if (localPlaylists === null) {
      setOpenedPlaylist(false);
      return;
    }

    const playlist = localPlaylists.find(({ id }) => id === playlistId);
    if (playlist === null) {
      setOpenedPlaylist(false);
      return;
    }
    
    setOpenedPlaylist(playlist);
  };
}
