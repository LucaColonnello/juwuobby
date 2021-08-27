import { message } from "antd";

import { useAddSongToPlaylistQueue, usePlaySong } from "../../actions";
import useContextMenu, { Commands } from "../../utils/hooks/useContextMenu";

import { UnableToAddSongToQueueError } from "../../errors";

import type { Song } from "../../types";

export default function useSongContextMenu() {
  const addSongToPlaylistQueue = useAddSongToPlaylistQueue();
  const playSong = usePlaySong();
  
    const commands: Commands<Song> = {
      add_to_queue: {
        label: "Add to queue",
        async run(song) {
          try {
            await addSongToPlaylistQueue(song);
          } catch (error) {
            if (error instanceof UnableToAddSongToQueueError) {
              message.warning(error.message);
              return false;
            }

            throw error;
          }
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
