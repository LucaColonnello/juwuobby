import { set, get } from "idb-keyval";
import { Playlist } from "../types";

const PLAYLIST_LIST = "PLAYLIST_LIST";

export async function getLocalPlaylists(): Promise<Partial<Playlist>[]> {
  return ((await get(PLAYLIST_LIST)) as Partial<Playlist>[]) || [];
}

export async function saveLocalPlaylists(
  playlists: Promise<Partial<Playlist>[]>
): Promise<undefined> {
  await set(PLAYLIST_LIST, playlists);
}
