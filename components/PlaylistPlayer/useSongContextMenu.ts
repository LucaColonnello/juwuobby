import useContextMenu, { Commands } from "../../utils/hooks/useContextMenu";

import {
  useRemoveSongFromPlaylistQueue,
  useRemoveAllSongsFromPlaylistQueue,
} from "../../actions";
import useLoggedInUser from "../../state/loggedInUser";
import useOpenedPlaylist from "../../state/openedPlaylist";
import canRemoveFromPlaylistQueue from "../../domain/services/canRemoveFromPlaylistQueue";

import type { PlaylistQueueItem } from "../../types";

export default function useSongContextMenu() {
  const [loggedInUser] = useLoggedInUser();
  const [openedPlaylist] = useOpenedPlaylist();

  const removeSongFromPlaylistQueue = useRemoveSongFromPlaylistQueue();
  const removeAllSongsFromPlaylistQueue = useRemoveAllSongsFromPlaylistQueue();
  
  if (
    loggedInUser &&
    openedPlaylist &&
    !canRemoveFromPlaylistQueue(loggedInUser, openedPlaylist)
  ) {
    return null;
  }

  const commands: Commands<PlaylistQueueItem> = {
    remove_from_queue: {
      label: "Remove from the queue",
      async run(playlistQueueItem: PlaylistQueueItem) {
        await removeSongFromPlaylistQueue(playlistQueueItem);
      },
      successText: "Removed from the queue",
      errorText:
        "There was an error while removing this song from the queue. Please contact the monkey developer 🐒 .",
    },
    remove_all_from_queue: {
      label: "Remove all from the queue",
      async run() {
        await removeAllSongsFromPlaylistQueue();
      },
      successText: "Removed all songs from the queue",
      errorText:
        "There was an error while removing all songs from the queue. Please contact the monkey developer 🐒 .",
    },
  };

  return useContextMenu<PlaylistQueueItem>({
    commands,
  });
}
