import * as PlaylistsRepository from "../repositories/Playlists";

import useLoggedInUser from "../state/loggedInUser";
import useLocalPlaylists from "../state/localPlaylists";
import { createPlaylist } from "../domain/entities/playlist";
import canCreateNewPlaylist from "../domain/services/canCreateNewPlaylist";

import type { PlaylistID, Action } from "../types";

export default function useCreateNewPlaylist(): Action<(
  name: string,
  publicKey: string,
) => Promise<PlaylistID>> {
  const [loggedInUser] = useLoggedInUser();
  const [, { addLocalPlaylist }] = useLocalPlaylists();

  return async function createNewPlaylist(name, publicKey) {
    if (loggedInUser === null || loggedInUser === false) {
      throw new Error("Cannot create a new playlist without a logged in user.");
    }

    if (!canCreateNewPlaylist(loggedInUser)) {
      throw new Error("Logged in user does not have permissions to create new playlists.");
    }

    const platlistEntity = createPlaylist(name, loggedInUser.uid, publicKey);
    const playlistId = await PlaylistsRepository.createPlaylist(platlistEntity);

    platlistEntity.id = playlistId;

    addLocalPlaylist(platlistEntity);

    return playlistId;
  };
}
