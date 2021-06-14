export type PlaylistID = string;

export interface NewPlaylistInput {
  name: string;
  publicKey: string;
}

export interface Playlist {
  id: PlaylistID;
  name: string;
  publicKey: string;
}
