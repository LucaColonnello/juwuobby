import type { Playlist, User } from "../../types";

export default function canRemoveFromPlaylistQueue(
  user: User,
  playlist: Playlist,
) {
  return user.uid === playlist.userId;
}
