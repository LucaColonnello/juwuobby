export type PlaylistID = string;

export interface Playlist {
  id?: PlaylistID;
  name: string;
  publicKey: string;
}
