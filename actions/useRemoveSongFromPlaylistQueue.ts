import * as PlaylistQueueRepository from "../repositories/PlaylistsQueue";
import useOpenedPlaylistSongs from "../state/openedPlaylistSongs";

import type { Action, PlaylistQueueItem } from "../types";

export default function useRemoveSongFromPlaylistQueue(): Action<
  (playlistQueueItem: PlaylistQueueItem) => Promise<void>
> {
  const [{ openedPlaylistSongs }] = useOpenedPlaylistSongs();

  return async function removeSongFromPlaylistQueue(playlistQueueItem: PlaylistQueueItem) {
    if (openedPlaylistSongs === null) {
      return;
    }

    await PlaylistQueueRepository.deleteSongFromPlaylistQueue(
      openedPlaylistSongs.id,
      playlistQueueItem,
    );
  };
}
