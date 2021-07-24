import * as PlaylistQueueRepository from "../repositories/PlaylistsQueue";
import useOpenedPlaylistSongs from "../state/openedPlaylistSongs";

import type { Action } from "../types";

export default function useRemoveAllSongsFromPlaylistQueue(): Action<
  () => Promise<void>
> {
  const [{ openedPlaylistSongs }] = useOpenedPlaylistSongs();

  return async function removeAllSongsFromPlaylistQueue() {
    if (openedPlaylistSongs === null) {
      return;
    }

    await PlaylistQueueRepository.deleteAllSongsFromPlaylistQueue(
      openedPlaylistSongs.id
    );
  };
}
