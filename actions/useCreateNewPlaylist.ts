import { useAtom } from "jotai";

import * as PlaylistsRepository from "../repositories/Playlists";
import { asyncLocalPlaylists } from "../state/localPlaylists";

import { NewPlaylistInput, PlaylistID } from "../types";

export default function useCreateNewPlaylist() {
  const [localPlaylists, setLocalPlaylists] = useAtom(asyncLocalPlaylists);

  return async function createNewPlaylist(
    newPlaylist: NewPlaylistInput
  ): Promise<PlaylistID> {
    const playlistId = await PlaylistsRepository.createPlaylist(newPlaylist);

    setLocalPlaylists([
      ...localPlaylists,
      {
        id: playlistId,
        ...newPlaylist
      }
    ]);

    return playlistId;
  };
}
