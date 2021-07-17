import { set, get } from "idb-keyval";
import { Playlist, PlaylistID, PlaylistSongs } from "../types";

const PLAYLIST_LIST = "PLAYLIST_LIST";
const PLAYLIST_SONGS = "PLAYLIST_SONGS";

export async function getLocalPlaylists(): Promise<Playlist[]> {
  return ((await get(PLAYLIST_LIST)) as Playlist[]) || [];
}

export async function saveLocalPlaylists(
  playlists: Playlist[]
): Promise<void> {
  await set(PLAYLIST_LIST, playlists);
}

export async function getLocalPlaylistSongsById(playlistId: PlaylistID): Promise<PlaylistSongs | null> {
  return ((await get(`${PLAYLIST_SONGS}_${playlistId}`)) as PlaylistSongs) || null;
}

export async function saveLocalPlaylistSongs(
  playlistSongs: PlaylistSongs
): Promise<void> {
  await set(`${PLAYLIST_SONGS}_${playlistSongs.id}`, {
    id: playlistSongs.id,
    root: playlistSongs.root,
    dirHandle: playlistSongs.dirHandle,
  } as PlaylistSongs);
}
