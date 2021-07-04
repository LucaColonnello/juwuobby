import { db } from "../firebase";
import { Playlist, PlaylistID } from "../types";

export async function createPlaylist(
  playlist: Playlist
): Promise<PlaylistID> {
  const createdPlaylist = await db.collection("Playlist").add(playlist);

  return createdPlaylist.id;
}

export async function deletePlaylistById(
  playlistId: PlaylistID
): Promise<void> {
  await db.collection("Playlist").doc(playlistId).delete();
}
