import * as PlaylistsRepository from "../repositories/Playlists";
import useLocalPlaylists from "../state/localPlaylists";
import { createPlaylist } from "../domain/entities/playlist";

import { PlaylistID, Action } from "../types";

export default function useCreateNewPlaylist(): Action<(
  name: string,
  publicKey: string,
) => Promise<PlaylistID>> {
  const [, { addLocalPlaylist }] = useLocalPlaylists();

  return async function createNewPlaylist(name, publicKey) {
    const platlisttEntity = createPlaylist(name, publicKey);
    const playlistId = await PlaylistsRepository.createPlaylist(platlisttEntity);

    platlisttEntity.id = playlistId;

    addLocalPlaylist(platlisttEntity);

    return playlistId;
  };
}
