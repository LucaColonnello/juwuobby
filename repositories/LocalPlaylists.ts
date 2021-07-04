import { set, get } from "idb-keyval";
import { Playlist } from "../types";

const PLAYLIST_LIST = "PLAYLIST_LIST";

export async function getLocalPlaylists(): Promise<Playlist[]> {
  return ((await get(PLAYLIST_LIST)) as Playlist[]) || [];
}

export async function saveLocalPlaylists(
  playlists: Playlist[]
): Promise<void> {
  await set(PLAYLIST_LIST, playlists);
}
