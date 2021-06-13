export type PlaylistID = string;

export interface NewPlaylistInput {
  name: string;
  secret: string;
  publicKey: string;
}

export interface Playlist {
  id: PlaylistID;
  name: string;
  secret: string;
  publicKey: string;
}
