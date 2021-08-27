import { message } from "antd";

import { useAddSongToPlaylistQueue } from "../../actions";
import useContextMenu, { Commands } from "../../utils/hooks/useContextMenu";

import { UnableToAddSongToQueueError } from "../../errors";

import type { Song } from "../../types";

export default function useSongContextMenu() {
  const addSongToPlaylistQueue = useAddSongToPlaylistQueue();
  
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
      }
    };

  return useContextMenu<Song>({
    commands,
  });
}
