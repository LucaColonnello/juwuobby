import * as PlaylistsQueueRepository from "../repositories/PlaylistsQueue";


import useOpenedPlaylistSongs from "../state/openedPlaylistSongs";
import useOpenedPlaylistQueue from "../state/openedPlaylistQueue";
import useCurrentlyPlayingSong from "../state/currentlyPlayingSong";
import pickRandomSongFromPlaylist from "../domain/services/pickRandomSongFromPlaylist";

import type { Action } from "../types";

export default function usePlayNextSong(): Action<() => Promise<void>> {
  const [{ openedPlaylistSongs }] = useOpenedPlaylistSongs();
  const [{ openedPlaylistQueueSorted }] = useOpenedPlaylistQueue();
  const [, { setCurrentlyPlayingSong }] = useCurrentlyPlayingSong();

  return async function playNextSong() {
    if (openedPlaylistSongs === null) {
      return;
    }

    if (openedPlaylistQueueSorted === null || !openedPlaylistQueueSorted.length) {
      const randomSong = pickRandomSongFromPlaylist(openedPlaylistSongs);
      setCurrentlyPlayingSong(randomSong);
      return;
    }
    
    const firstInQueue = openedPlaylistQueueSorted[0];

    await PlaylistsQueueRepository.deleteSongFromPlaylistQueue(
      openedPlaylistSongs.id,
      firstInQueue,
    );
    setCurrentlyPlayingSong(
      openedPlaylistSongs.songsByHash.get(firstInQueue.songHash)
    );
  };
}
