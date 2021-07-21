import * as PlaylistQueueRepository from "../repositories/PlaylistsQueue";
import { createPlaylistQueueItem } from "../domain/entities/playlistQueue";
import useOpenedPlaylistSongs from "../state/openedPlaylistSongs";

import type { Action, Song } from "../types";

export default function useAddSongToPlaylistQueue(): Action<
  (song: Song) => Promise<void>
> {
  const [{ openedPlaylistSongs }] = useOpenedPlaylistSongs();

  return async function addSongToPlaylistQueue(song) {
    if (openedPlaylistSongs === null) {
      return;
    }

    const playlistQueueItem = createPlaylistQueueItem(song.hash);
    await PlaylistQueueRepository.addSongToPlaylistQueue(
      openedPlaylistSongs.id,
      playlistQueueItem,
    );
  };
}
