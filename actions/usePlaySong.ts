import useOpenedPlaylistSongs from "../state/openedPlaylistSongs";
import useCurrentlyPlayingSong from "../state/currentlyPlayingSong";

import type { Action, Song } from "../types";

export default function usePlaySong(): Action<(song: Song) => void> {
  const [{ openedPlaylistSongs }] = useOpenedPlaylistSongs();
  const [, { setCurrentlyPlayingSong }] = useCurrentlyPlayingSong();

  return function playSong(song) {
    if (openedPlaylistSongs === null) {
      return;
    }

    setCurrentlyPlayingSong(song);
  };
}
