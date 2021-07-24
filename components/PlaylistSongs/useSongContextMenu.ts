import { useAddSongToPlaylistQueue, usePlaySong } from "../../actions";
import useContextMenu, { Commands } from "../../utils/hooks/useContextMenu";

import type { Song } from "../../types";

export default function useSongContextMenu() {
  const addSongToPlaylistQueue = useAddSongToPlaylistQueue();
  const playSong = usePlaySong();
  
    const commands: Commands<Song> = {
      add_to_queue: {
        label: "Add to queue",
        async run(song) {
          await addSongToPlaylistQueue(song);
        },
        successText: "Added to queue",
        errorText:
          "There was an error while adding this song to the queue. Please contact the monkey developer 🐒 .",
      },
      play_now: {
        label: "Play now",
        async run(song) {
          await playSong(song);
        },
        successText: "Playing now",
        errorText:
          "There was an error while playing this song. Please contact the monkey developer 🐒 ."
      }
    };

  return useContextMenu<Song>({
    commands,
  });
}
