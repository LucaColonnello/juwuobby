import type { Playlist, User } from "../../types";

export default function canDeletePlaylist(
  user: User,
  playlist: Playlist,
) {
  return user.uid === playlist.userId;
}
