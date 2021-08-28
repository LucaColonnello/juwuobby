import { atom } from "jotai";
import { atomWithDefault, RESET } from "jotai/utils";
import Fuse from 'fuse.js';

import { Dir, PlaylistSongs, Song, SongHash } from "../../types";

const getCurrentLocationHash = () => decodeURIComponent(window.location.hash.substring(1));

const currentPlaylistSongsAtom = atom<PlaylistSongs | null>(null);
const currentSearchAtom = atom<string>("");

const navigationHistoryAtom = atomWithDefault<string>((get) => {
  const playlistSongs = get(currentPlaylistSongsAtom);
  if (playlistSongs === null) {
    return "";
  }

  const hash = getCurrentLocationHash();
  if (hash !== "") {
    return hash;
  }

  history.replaceState(null, null, `#${playlistSongs.root.name}`);
  return playlistSongs.root.name;
});
navigationHistoryAtom.onMount = (set) => {
  const hashChangeHandler = () => {
    set(getCurrentLocationHash());
    window.scrollTo(0, 0);
  };
  window.addEventListener("hashchange", hashChangeHandler);

  return () => {
    set(RESET);
    window.removeEventListener("hashchange", hashChangeHandler);
  }
};

const navigateForwardAtom = atom<null, Dir>(
  () => null,
  (get, set, dir): void => {
    const navigationHistory = get(navigationHistoryAtom);
    if (!navigationHistory.length) {
      return;
    }

    const newPath = `${navigationHistory}/${dir.name}`;
    history.pushState(null, null, `#${newPath}`);
    set(navigationHistoryAtom, newPath);
    window.scrollTo(0, 0);
  }
);

const navigateBackAtom = atom<null, void>(
  () => null,
  (get, set): void => {
    const navigationHistory = get(navigationHistoryAtom);
    if (!navigationHistory.length) {
      return;
    }

    const newPath = navigationHistory
      .split("/")
      .slice(0, -1)
      .join("/");

    history.pushState(null, null, `#${newPath}`);
    set(navigationHistoryAtom, newPath);
    window.scrollTo(0, 0);
  }
);

const currentDirAtom = atom<Dir | null>((get) => {
  const playlistSongs = get(currentPlaylistSongsAtom);
  const navigationHistory = get(navigationHistoryAtom);
  if (playlistSongs === null || !navigationHistory.length) {
    return null;
  }

  const dirNames = navigationHistory.split("/");

  let currentDir: Dir = {
    name: '',
    dirs: [playlistSongs.root],
    songs: [],
  };
  for (const dirName of dirNames) {
    const dir = currentDir.dirs.find(({ name }) => name === dirName);
    if (dir === null) {
      currentDir = null;
      break;
    }

    currentDir = dir;
  }

  return currentDir;
});

const searchIndexAtom = atom<Fuse<Song> | null>((get) => {
  const playlistSongs = get(currentPlaylistSongsAtom);
  if (playlistSongs === null) {
    return null;
  }

  const indexOptions: Fuse.IFuseOptions<Song> = {
    includeScore: true,
    ignoreLocation: true,
    threshold: 0.2,
    keys: ['name']
  };

  const data: Song[] =
    Array.from(playlistSongs.songsByHash).map(([ , song ]) => song);
  
  return new Fuse(data, indexOptions);
});

const searchResultsAtom = atom<SongHash[] | null>((get) => {
  const search = get(currentSearchAtom);
  const searchIndex = get(searchIndexAtom);
  if (searchIndex === null) {
    return null;
  }

  const results = searchIndex.search(search, { limit: 50 });
  return results.map((song) => song.item.hash);
});

const songsNavigatorScope = Symbol("songsNavigatorScope");

currentPlaylistSongsAtom.scope = songsNavigatorScope;
navigationHistoryAtom.scope = songsNavigatorScope;
navigateForwardAtom.scope = songsNavigatorScope;
navigateBackAtom.scope = songsNavigatorScope;
currentDirAtom.scope = songsNavigatorScope;
currentSearchAtom.scope = songsNavigatorScope;
searchIndexAtom.scope = songsNavigatorScope;
searchResultsAtom.scope = songsNavigatorScope;

export {
  songsNavigatorScope,
  currentPlaylistSongsAtom,
  navigationHistoryAtom,
  navigateForwardAtom,
  navigateBackAtom,
  currentDirAtom,
  currentSearchAtom,
  searchResultsAtom,
};
