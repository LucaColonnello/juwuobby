import { PlaylistID } from "./Playlist";

export interface PlaylistSongs {
  id: PlaylistID;
  dir: FileSystemDirectoryHandle;
  songs: Song[];
}

export interface Song {
  path: string;
  name: string;
}
