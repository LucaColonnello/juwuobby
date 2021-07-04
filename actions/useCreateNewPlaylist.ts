import * as PlaylistsRepository from "../repositories/Playlists";
import useLocalPlaylists from "../state/localPlaylists";
import { createPlaylist } from "../domain/playlist";

import { NewPlaylistInput, PlaylistID, Action } from "../types";

export default function useCreateNewPlaylist(): Action<(
  newPlaylist: NewPlaylistInput
) => Promise<PlaylistID>> {
  const [, { addLocalPlaylist }] = useLocalPlaylists();

  return async function createNewPlaylist(newPlaylist) {
    const platlisttEntity = createPlaylist(newPlaylist);
    const playlistId = await PlaylistsRepository.createPlaylist(platlisttEntity);

    platlisttEntity.id = playlistId;

    addLocalPlaylist(platlisttEntity);

    return playlistId;
  };
}
