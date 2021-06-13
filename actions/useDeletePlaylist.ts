import * as PlaylistsRepository from "../repositories/Playlists";
import useLocalPlaylists from "../state/localPlaylists";

import { PlaylistID } from "../types";

export default function useDeletePlaylist() {
  const [, { deleteLocalPlaylistById }] = useLocalPlaylists();

  return async function deletePlaylist(playlistId: PlaylistID): Promise<void> {
    await PlaylistsRepository.deletePlaylistById(playlistId);
    deleteLocalPlaylistById(playlistId);

    return playlistId;
  };
}
