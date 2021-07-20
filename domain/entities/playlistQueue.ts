import type { PlaylistQueueItem, SongHash } from "../../types";

export function createPlaylistQueueItem(songHash: SongHash): PlaylistQueueItem {
  if (!songHash || songHash.trim() === "") {
    throw new Error("Playlist song hash cannot be empty");
  }

  return {
    songHash,
    addedTime: new Date().getTime(),
  };
}
