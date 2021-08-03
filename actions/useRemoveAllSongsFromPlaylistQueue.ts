import * as PlaylistQueueRepository from "../repositories/PlaylistsQueue";

import useLoggedInUser from "../state/loggedInUser";
import useOpenedPlaylist from "../state/openedPlaylist";
import useOpenedPlaylistSongs from "../state/openedPlaylistSongs";

import canRemoveFromPlaylistQueue from "../domain/services/canRemoveFromPlaylistQueue";

import type { Action } from "../types";

export default function useRemoveAllSongsFromPlaylistQueue(): Action<
  () => Promise<void>
> {
  const [loggedInUser] = useLoggedInUser();
  const [openedPlaylist] = useOpenedPlaylist();
  const [{ openedPlaylistSongs }] = useOpenedPlaylistSongs();

  return async function removeAllSongsFromPlaylistQueue() {
    if (loggedInUser === null || loggedInUser === false) {
      throw new Error("Cannot remove all songs from the queue. Missing logged in user.");
    }

    if (
      openedPlaylist === null ||
      openedPlaylist === false ||
      openedPlaylistSongs === null
    ) {
      return;
    }

    if (!canRemoveFromPlaylistQueue(loggedInUser, openedPlaylist)) {
      throw new Error("Logged in user does not have permissions to remove all songs from the queue.");
    }

    await PlaylistQueueRepository.deleteAllSongsFromPlaylistQueue(
      openedPlaylistSongs.id
    );
  };
}
