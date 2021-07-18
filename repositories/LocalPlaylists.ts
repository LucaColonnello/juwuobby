import { set, get } from "idb-keyval";

import type {
  Playlist,
  PlaylistID,
  PlaylistSongs,
  SongHash,
  Song
} from "../types";

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
  const playlistSongs = ((await get(`${PLAYLIST_SONGS}_${playlistId}`)) as PlaylistSongs) || null;
  if (playlistSongs === null) {
    return null;
  }

  playlistSongs.songsByHash = new Map<SongHash, Song>(
    Object.entries(playlistSongs.songsByHash)
  );

  return playlistSongs;
}

export async function saveLocalPlaylistSongs(
  playlistSongs: PlaylistSongs
): Promise<void> {
  // save the playlist without files, to optimise for space;
  // files get serialised and bring in the byte content,
  // which bloats the IndexedDB memory
  const songsByHash = {};
  playlistSongs.songsByHash.forEach((song, songHash) => {
    const { fileHandle, ...songWithoutFile } = song;
    songsByHash[songHash] = songWithoutFile;
  });

  await set(`${PLAYLIST_SONGS}_${playlistSongs.id}`, {
    id: playlistSongs.id,
    root: playlistSongs.root,
    dirHandle: playlistSongs.dirHandle,
    songsByHash,
  } as PlaylistSongs);
}
