import * as PlaylistsRepository from "../repositories/Playlists";
import useLocalPlaylists from "../state/localPlaylists";

import { PlaylistID, Action } from "../types";

export default function useDeletePlaylist(): Action<(playlistId: PlaylistID) => Promise<void>> {
  const [, { deleteLocalPlaylistById }] = useLocalPlaylists();

  return async function deletePlaylist(playlistId) {
    await PlaylistsRepository.deletePlaylistById(playlistId);
    deleteLocalPlaylistById(playlistId);
  };
}
