import type { PlaylistQueue, PlaylistQueueItem } from "../../types";

export default function canAddSongFromPlaylistQueue(
  itemToAdd: PlaylistQueueItem,
  playlistQueue: PlaylistQueue,
) {
  return !playlistQueue.find((item) => {
    return item.songHash === itemToAdd.songHash;
  });
}
