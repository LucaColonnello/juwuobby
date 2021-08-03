import * as PlaylistQueueRepository from "../repositories/PlaylistsQueue";

import { createPlaylistQueueItem } from "../domain/entities/playlistQueue";
import useOpenedPlaylistSongs from "../state/openedPlaylistSongs";
import useOpenedPlaylist from "../state/openedPlaylist";

import type { Action, Song } from "../types";

export default function useAddSongToPlaylistQueue(): Action<
  (song: Song) => Promise<void>
> {
  const [openedPlaylist] = useOpenedPlaylist();
  const [{ openedPlaylistSongs }] = useOpenedPlaylistSongs();

  return async function addSongToPlaylistQueue(song) {
    if (
      openedPlaylist === null ||
      openedPlaylist === false ||
      openedPlaylistSongs === null
    ) {
      return;
    }

    const playlistQueueItem = createPlaylistQueueItem(song.hash);
    await PlaylistQueueRepository.addSongToPlaylistQueue(
      openedPlaylistSongs.id,
      playlistQueueItem,
    );
  };
}
