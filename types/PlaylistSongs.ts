import { PlaylistID } from "./Playlist";

export type SongHash = string;

export interface PlaylistSongs {
  id: PlaylistID;
  root: Dir;
  dirHandle?: FileSystemDirectoryHandle;
  songFilesByHash?: Map<SongHash, EnhancedFile>;
}

export interface Dir {
  name: string;
  dirs: Dir[];
  songs: Song[];
}

export interface Song {
  hash: SongHash;
  name: string;
}
