import { PlaylistID } from "./Playlist";

export type SongHash = string;

export interface PlaylistSongs {
  id: PlaylistID;
  root: Dir;
  songsByHash: Map<SongHash, Song>;
  dirHandle?: FileSystemDirectoryHandle;
}

export interface Dir {
  name: string;
  dirs: Dir[];
  songs: SongHash[];
}

export interface Song {
  hash: SongHash;
  name: string;
  fileHandle?: EnhancedFile;
}
