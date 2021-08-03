import type { Playlist, User } from "../../types";

export default function canAddSongsToPlaylist(
  user: User,
  playlist: Playlist,
) {
  return user.uid === playlist.userId;
}
