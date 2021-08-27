import * as PlaylistsQueueRepository from "../repositories/PlaylistsQueue";


import useOpenedPlaylistSongs from "../state/openedPlaylistSongs";
import useOpenedPlaylistQueue from "../state/openedPlaylistQueue";
import useCurrentlyPlayingSong from "../state/currentlyPlayingSong";
import pickRandomSongFromPlaylist from "../domain/services/pickRandomSongFromPlaylist";

import type { Action } from "../types";

export default function usePlayNextSong(): Action<() => Promise<void>> {
  const [{ openedPlaylistSongs }] = useOpenedPlaylistSongs();
  const [{ openedPlaylistQueueSorted }] = useOpenedPlaylistQueue();
  const [{ currentlyPlayingSong }, { setCurrentlyPlayingSong }] = useCurrentlyPlayingSong();

  return async function playNextSong() {
    if (openedPlaylistSongs === null || openedPlaylistQueueSorted === null) {
      return;
    }

    const isNextSongCurrentlyPlayingSong =
      openedPlaylistQueueSorted[0]?.songHash === currentlyPlayingSong?.hash;

    if (
      !openedPlaylistQueueSorted.length ||
      isNextSongCurrentlyPlayingSong
    ) {
      if (isNextSongCurrentlyPlayingSong) {
        await PlaylistsQueueRepository.deleteSongFromPlaylistQueue(
          openedPlaylistSongs.id,
          openedPlaylistQueueSorted[0],
        );
      }

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
