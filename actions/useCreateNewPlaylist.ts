import * as PlaylistsRepository from "../repositories/Playlists";
import useLocalPlaylists from "../state/localPlaylists";

import { NewPlaylistInput, PlaylistID, Action } from "../types";

export default function useCreateNewPlaylist(): Action<(
  newPlaylist: NewPlaylistInput
) => Promise<PlaylistID>> {
  const [, { addLocalPlaylist }] = useLocalPlaylists();

  return async function createNewPlaylist(newPlaylist) {
    const playlistId = await PlaylistsRepository.createPlaylist(newPlaylist);

    addLocalPlaylist({
      id: playlistId,
      ...newPlaylist
    });

    return playlistId;
  };
}
