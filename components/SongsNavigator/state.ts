import { atom } from "jotai";
import { atomWithDefault, RESET } from "jotai/utils";
import { Dir, PlaylistSongs } from "../../types";

const currentPlaylistSongsAtom = atom<PlaylistSongs | null>(null);

const navigationHistoryAtom = atomWithDefault<Dir[]>((get) => {
  const playlistSongs = get(currentPlaylistSongsAtom);
  if (playlistSongs === null) {
    return [];
  }

  return [playlistSongs.root];
});
navigationHistoryAtom.onMount = (set) => {
  return () => {
    set(RESET);
  }
};

const navigateForwardAtom = atom<null, Dir>(
  () => null,
  (get, set, dir): void => {
    const navigationHistory = get(navigationHistoryAtom);
    if (!navigationHistory.length) {
      return;
    }

    set(navigationHistoryAtom, [...navigationHistory, dir]);
  }
);

const navigateBackAtom = atom<null, void>(
  () => null,
  (get, set): void => {
    const navigationHistory = get(navigationHistoryAtom);
    if (!navigationHistory.length) {
      return;
    }

    set(navigationHistoryAtom, navigationHistory.slice(0, -1));
  }
);

const currentDirAtom = atom<Dir | null>((get) => {
  const navigationHistory = get(navigationHistoryAtom);
  if (!navigationHistory.length) {
    return null;
  }

  return navigationHistory[navigationHistory.length - 1];
});


export {
  currentPlaylistSongsAtom,
  navigationHistoryAtom,
  navigateForwardAtom,
  navigateBackAtom,
  currentDirAtom
};
