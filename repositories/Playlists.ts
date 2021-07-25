import { db, firebase } from "../firebase";
import * as Compression from "../utils/Compression";

import type { Playlist, PlaylistID, PlaylistSongs } from "../types";

const PLAYLIST_SONGS_CHUNK_SIZE_IN_BYTES = 950_000;

export async function createPlaylist(
  playlist: Playlist
): Promise<PlaylistID> {
  const createdPlaylist = await db.collection("Playlist").add(playlist);

  return createdPlaylist.id;
}

export async function deletePlaylistById(
  playlistId: PlaylistID
): Promise<void> {
  await db.collection("Playlist").doc(playlistId).delete();
}

export async function emptyPlaylistSongs(
  playlistId: PlaylistID
): Promise<void> {
  const playlistSongsChunksCollection = (
    await db
      .collection("Playlist")
      .doc(playlistId)
      .collection("PlaylistSongsChunks")
      .get()
  );
  
  await Promise.all(
    playlistSongsChunksCollection.docs.map(doc => doc.ref.delete())
  );
}


export async function savePlaylistSongs(
  playlistId: PlaylistID,
  playlistSongs: PlaylistSongs
): Promise<void> {
  const payload = {
    root: playlistSongs.root,
    songsByHash: {},
  };

  // normalise songs to optimise for space by removing the file handles
  playlistSongs.songsByHash.forEach((song, songHash) => {
    const { fileHandle, ...songWithoutFile } = song;
    payload.songsByHash[songHash] = songWithoutFile;
  });

  const payloadJson = JSON.stringify(payload);
  const chunks: Uint8Array[] = Compression.deflateInChunks(
    payloadJson,
    PLAYLIST_SONGS_CHUNK_SIZE_IN_BYTES,
  );

  const totalOriginalSize = new Blob([payloadJson]).size;
  const totalSize = chunks.reduce((sum, chunk) => sum + chunk.byteLength, 0);

  const playlistSongsChunks = (
    await db
      .collection("Playlist")
      .doc(playlistId)
      .collection("PlaylistSongsChunks")
  );

  await Promise.all(chunks.map(async (chunk, index) => {
    await playlistSongsChunks.add({
      index,
      size: chunk.byteLength,
      totalSize,
      totalOriginalSize,
      blob: firebase.firestore.Blob.fromUint8Array(chunk),
    });
  }));
}

export async function getPlaylistSongs(
  playlistId: PlaylistID
): Promise<PlaylistSongs> {
  const playlistSongsChunks = (
    await db
      .collection("Playlist")
      .doc(playlistId)
      .collection("PlaylistSongsChunks")
      .orderBy("index")
      .get()
  );

  const byteChunks = playlistSongsChunks.docs.map((doc) => {
    const blob: firebase.firestore.Blob = doc.get("blob");
    return blob.toUint8Array();
  });

  const payload = JSON.parse(Compression.inflateFromChunks(byteChunks));

  return {
    id: playlistId,
    root: payload.root,
    songsByHash: new Map(Object.entries(payload.songsByHash)),
  };
}
