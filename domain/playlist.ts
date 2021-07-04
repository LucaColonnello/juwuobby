import { Playlist } from "../types";

export const createPlaylist = (
  name: string,
  publicKey: string,
): Playlist => {
  if (!name || name.trim() === '') {
    throw new Error('Playlist name cannot be empty');
  }

  if (!publicKey || publicKey.trim() === '') {
    throw new Error('Playlist publicKey cannot be empty');
  }

  return {
    name: name.trim(),
    publicKey,
  };
};
