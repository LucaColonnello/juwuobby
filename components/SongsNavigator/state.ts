import { atom } from "jotai";
import { atomWithDefault, RESET } from "jotai/utils";
import { Dir, PlaylistSongs } from "../../types";

const getCurrentLocationHash = () => decodeURIComponent(window.location.hash.substring(1));

const currentPlaylistSongsAtom = atom<PlaylistSongs | null>(null);

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


const songsNavigatorScope = Symbol("songsNavigatorScope");

currentPlaylistSongsAtom.scope = songsNavigatorScope;
navigationHistoryAtom.scope = songsNavigatorScope;
navigateForwardAtom.scope = songsNavigatorScope;
navigateBackAtom.scope = songsNavigatorScope;
currentDirAtom.scope = songsNavigatorScope;

export {
  songsNavigatorScope,
  currentPlaylistSongsAtom,
  navigationHistoryAtom,
  navigateForwardAtom,
  navigateBackAtom,
  currentDirAtom
};
