import { db } from "../firebase";
import { PlaylistQueue, PlaylistQueueItem, PlaylistID } from "../types";

export type Unsubscribe = () => void;

export function subscribeToPlaylistQueue(
  playlistId: PlaylistID,
  onChange: (playlistQueue: PlaylistQueue) => void
): Unsubscribe {
  return db
    .collection("Playlist")
    .doc(playlistId)
    .collection("PlaylistQueue")
    .onSnapshot((snapshot) => {
      const playlistQueue: PlaylistQueue = [];

      snapshot.forEach((doc) => {
        playlistQueue.push({ id: doc.id, ...doc.data() } as PlaylistQueueItem);
      });

      onChange(playlistQueue);
    });
}

export async function deleteSongFromPlaylistQueue(
  playlistId: PlaylistID,
  playlistQueueItem: PlaylistQueueItem,
): Promise<void> {
  await db
    .collection("Playlist")
    .doc(playlistId)
    .collection("PlaylistQueue")
    .doc(playlistQueueItem.id)
    .delete();
}

export async function deleteAllSongsFromPlaylistQueue(
  playlistId: PlaylistID,
): Promise<void> {
  const playlistQueueCollection = await db
    .collection("Playlist")
    .doc(playlistId)
    .collection("PlaylistQueue")
    .get();
  
  await Promise.all(playlistQueueCollection.docs.map(doc => doc.ref.delete()));
}

export async function addSongToPlaylistQueue(
  playlistId: PlaylistID,
  playlistQueueItem: PlaylistQueueItem,
): Promise<void> {
  await db
    .collection("Playlist")
    .doc(playlistId)
    .collection("PlaylistQueue")
    .add(playlistQueueItem);
}
