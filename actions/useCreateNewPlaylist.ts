import * as PlaylistsRepository from "../repositories/Playlists";
import useLocalPlaylists from "../state/localPlaylists";

import { NewPlaylistInput, PlaylistID } from "../types";

export default function useCreateNewPlaylist() {
  const [, { addLocalPlaylist }] = useLocalPlaylists();

  return async function createNewPlaylist(
    newPlaylist: NewPlaylistInput
  ): Promise<PlaylistID> {
    const playlistId = await PlaylistsRepository.createPlaylist(newPlaylist);

    addLocalPlaylist({
      id: playlistId,
      ...newPlaylist
    });

    return playlistId;
  };
}
