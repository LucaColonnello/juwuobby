import type { Song, PlaylistSongs } from "../../types";

export default function pickRandomSongFromPlaylist(playlistSongs: PlaylistSongs): Song | null {
  if (playlistSongs === null || playlistSongs.songsByHash.size === 0) {
    return null;
  }

  const songs = Array.from(playlistSongs.songsByHash.values());
  const randomIndex = Math.floor(Math.random() * songs.length);

  return songs[randomIndex];
}
