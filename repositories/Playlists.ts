import { db } from "../firebase";
import { NewPlaylistInput, PlaylistID } from "../types";

export async function createPlaylist(
  newPlaylist: NewPlaylistInput
): Promise<PlaylistID> {
  const playlist = await db.collection("Playlist").add(newPlaylist);

  return playlist.id;
}
