import * as PlaylistQueueRepository from "../repositories/PlaylistsQueue";

import useLoggedInUser from "../state/loggedInUser";
import useOpenedPlaylist from "../state/openedPlaylist";
import useOpenedPlaylistSongs from "../state/openedPlaylistSongs";

import canRemoveFromPlaylistQueue from "../domain/services/canRemoveFromPlaylistQueue";

import type { Action, PlaylistQueueItem } from "../types";

export default function useRemoveSongFromPlaylistQueue(): Action<
  (playlistQueueItem: PlaylistQueueItem) => Promise<void>
> {
  const [loggedInUser] = useLoggedInUser();
  const [openedPlaylist] = useOpenedPlaylist();
  const [{ openedPlaylistSongs }] = useOpenedPlaylistSongs();

  return async function removeSongFromPlaylistQueue(playlistQueueItem: PlaylistQueueItem) {
    if (loggedInUser === null || loggedInUser === false) {
      throw new Error("Cannot remove this song from the queue. Missing logged in user.");
    }

    if (
      openedPlaylist === null ||
      openedPlaylist === false ||
      openedPlaylistSongs === null
    ) {
      return;
    }

    if (!canRemoveFromPlaylistQueue(loggedInUser, openedPlaylist)) {
      throw new Error("Logged in user does not have permissions to remove this song from the queue.");
    }

    await PlaylistQueueRepository.deleteSongFromPlaylistQueue(
      openedPlaylistSongs.id,
      playlistQueueItem,
    );
  };
}
