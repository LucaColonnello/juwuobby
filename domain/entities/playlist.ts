import { Playlist, UserUID } from "../../types";

export const createPlaylist = (
  name: string,
  userId: UserUID,
  publicKey: string,
): Playlist => {
  if (!name || name.trim() === "") {
    throw new Error("Playlist name cannot be empty");
  }

  if (!userId || userId.trim() === "") {
    throw new Error("Playlist user id cannot be empty");
  }

  if (!publicKey || publicKey.trim() === "") {
    throw new Error("Playlist publicKey cannot be empty");
  }

  return {
    name: name.trim(),
    userId,
    publicKey,
  };
};
