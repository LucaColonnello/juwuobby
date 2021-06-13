import { db } from "../firebase";
import { NewPlaylistInput, PlaylistID } from "../types";

export async function createPlaylist(
  newPlaylist: NewPlaylistInput
): Promise<PlaylistID> {
  const playlistId = await db.collection("Playlist").add(newPlaylist);

  return playlistId;
}
