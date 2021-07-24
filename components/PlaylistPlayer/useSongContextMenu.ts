import { useRemoveSongFromPlaylistQueue } from "../../actions";
import useContextMenu, { Commands } from "../../utils/hooks/useContextMenu";

import type { PlaylistQueueItem } from "../../types";

export default function useSongContextMenu() {
  const removeSongFromPlaylistQueue = useRemoveSongFromPlaylistQueue();
  
    const commands: Commands<PlaylistQueueItem> = {
      remove_from_queue: {
        label: "Remove from queue",
        async run(playlistQueueItem: PlaylistQueueItem) {
          await removeSongFromPlaylistQueue(playlistQueueItem);
        },
        successText: "Removed from the queue",
        errorText:
          "There was an error while removing this song from the queue. Please contact the monkey developer 🐒 .",
      },
    };

  return useContextMenu<PlaylistQueueItem>({
    commands,
  });
}
