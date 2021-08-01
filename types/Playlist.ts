import type { UserUID } from "./User";

export type PlaylistID = string;

export interface Playlist {
  id?: PlaylistID;
  userId: UserUID;
  name: string;
  publicKey: string;
}
