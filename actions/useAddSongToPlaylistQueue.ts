import * as PlaylistQueueRepository from "../repositories/PlaylistsQueue";

import { createPlaylistQueueItem } from "../domain/entities/playlistQueue";
import canAddSongToPlaylistQueue from "../domain/services/canAddSongToPlaylistQueue";
import useOpenedPlaylistSongs from "../state/openedPlaylistSongs";
import useOpenedPlaylist from "../state/openedPlaylist";
import useOpenedPlaylistQueue from "../state/openedPlaylistQueue";

import { UnableToAddSongToQueueError } from "../errors";

import type { Action, Song } from "../types";

export default function useAddSongToPlaylistQueue(): Action<
  (song: Song) => Promise<void>
> {
  const [openedPlaylist] = useOpenedPlaylist();
  const [{ openedPlaylistSongs }] = useOpenedPlaylistSongs();
  const [{ openedPlaylistQueueSorted }] = useOpenedPlaylistQueue();

  return async function addSongToPlaylistQueue(song) {
    if (
      openedPlaylist === null ||
      openedPlaylist === false ||
      openedPlaylistSongs === null ||
      openedPlaylistQueueSorted === null
    ) {
      return;
    }

    const playlistQueueItem = createPlaylistQueueItem(song.hash);
    if (!canAddSongToPlaylistQueue(playlistQueueItem, openedPlaylistQueueSorted)) {
      throw new UnableToAddSongToQueueError("This song is already in the queue, please choose another song.");
    }

    await PlaylistQueueRepository.addSongToPlaylistQueue(
      openedPlaylistSongs.id,
      playlistQueueItem,
    );
  };
}
