import * as PlaylistsRepository from "../repositories/Playlists";

import useLocalPlaylists from "../state/localPlaylists";
import useLoggedInUser from "../state/loggedInUser";

import canDeletePlaylist from "../domain/services/canDeletePlaylist";

import type { Playlist, Action } from "../types";

export default function useDeletePlaylist(): Action<
  (playlist: Playlist) => Promise<void>
> {
  const [loggedInUser] = useLoggedInUser();
  const [, { deleteLocalPlaylistById }] = useLocalPlaylists();

  return async function deletePlaylist(playlist) {
    if (loggedInUser === null || loggedInUser === false) {
      throw new Error("Cannot delete playlist. Missing logged in user.");
    }

    if (!canDeletePlaylist(loggedInUser, playlist)) {
      throw new Error("Logged in user does not have permissions to delete this playlist.");
    }

    await PlaylistsRepository.deletePlaylistById(playlist.id);
    deleteLocalPlaylistById(playlist.id);
  };
}
