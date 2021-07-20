import shorthash2 from "shorthash2";
import { Dir, PlaylistID, PlaylistSongs, Song, SongHash } from "../../types";
import sortedArrayPush from "../../utils/sortedArrayPush";

export const createPlaylistSongsFromDirAndFiles = (
  playlistId: PlaylistID,
  dir: FileSystemDirectoryHandle,
  files: EnhancedFile[],
): PlaylistSongs => {
  if (typeof playlistId === undefined) {
    throw new Error("PlaylistSongs cannot be created, missing playlist id");
  }

  if (typeof dir === undefined) {
    throw new Error("PlaylistSongs cannot be created, missing dir handle");
  }

  if (typeof files === undefined || !files.length) {
    throw new Error("PlaylistSongs cannot be created, empty list of files");
  }

  const dirByName = new Map<string, Dir>();

  const rootDir: Dir = {
    name: dir.name,
    dirs: [],
    songs: [],
  };
  const playlistSongs: PlaylistSongs = {
    id: playlistId,
    root: rootDir,
    dirHandle: dir,
    songsByHash: new Map<SongHash, Song>(),
  };

  dirByName.set(dir.name, rootDir);

  const createParentsDirsfromPath = (ancestors: string[]) => {
    let parent = rootDir;
    let pathSoFar = rootDir.name;

    // exclude root, as we already have it
    ancestors.slice(1).forEach((ancestor) => {
      const ancestorFullPath = `${pathSoFar}/${ancestor}`;

      if (!dirByName.has(ancestorFullPath)) {
        const dir: Dir = {
          name: ancestor,
          dirs: [],
          songs: [],
        };

        sortedArrayPush(parent.dirs, dir, dir => dir.name.toLowerCase());
        dirByName.set(ancestorFullPath, dir);

        parent = dir;
      } else {
        parent = dirByName.get(ancestorFullPath);
      }

      pathSoFar = ancestorFullPath;
    });
  };

  const getAncestors = (file: EnhancedFile): string[] =>
    file.webkitRelativePath.split("/").slice(0, -1);

  for (let file of files) {
    const songHash = shorthash2(file.webkitRelativePath);
    
    const ancestors = getAncestors(file);
    const folderPath = ancestors.join("/");

    if (!dirByName.has(folderPath)) {
      createParentsDirsfromPath(ancestors);
    }

    const song: Song = {
      hash: songHash,
      name: file.name,
      fileHandle: file,
    };

    playlistSongs.songsByHash.set(songHash, song);

    const parentFolder = dirByName.get(folderPath);
    sortedArrayPush(
      parentFolder.songs,
      songHash,
      songHash => playlistSongs.songsByHash.get(songHash)?.name.toLowerCase(),
    );
  }

  return playlistSongs;
};

export const addPlaylistSongsSongFiles = (
  playlistSongs: PlaylistSongs,
  files: EnhancedFile[],
): PlaylistSongs => {
  if (typeof files === undefined || !files.length) {
    throw new Error("Cannot add songFilesByHash to PlaylistSongs, empty list of files");
  }

  for (let file of files) {
    const songHash = shorthash2(file.webkitRelativePath);

    if (playlistSongs.songsByHash.has(songHash)) {
      playlistSongs.songsByHash.get(songHash).fileHandle = file;
    }
  }

  return {
    ...playlistSongs,
    songsByHash: playlistSongs.songsByHash,
  };
};
