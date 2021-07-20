import { atom, useAtom } from "jotai";

import { openedPlaylistSongsAtom } from "./openedPlaylistSongs";
import type { PlaylistQueue, State } from "../types";

type OpenedPlaylistQueue = PlaylistQueue | null;

export const openedPlaylistQueueAtom = atom<OpenedPlaylistQueue, OpenedPlaylistQueue>(null, null);
openedPlaylistQueueAtom.onMount = (set) => {
  return () => {
    set(null);
  }
};

export const openedPlaylistQueueSortedAtom = atom<OpenedPlaylistQueue>((get) => {
  const openedPlaylistQueue = get(openedPlaylistQueueAtom);
  const openedPlaylistSongs = get(openedPlaylistSongsAtom);

  if (openedPlaylistQueue === null || openedPlaylistSongs === null) {
    return null;
  }

  const { songsByHash } = openedPlaylistSongs;

  return openedPlaylistQueue
    .filter((song) => songsByHash.has(song.songHash))
    .sort((a, b) => a.addedTime - b.addedTime);
});

interface UseOpenedPlaylistQueueOps {
  setOpenedPlaylistQueue: (playlistQueue: PlaylistQueue) => void;
}

export default function useOpenedPlaylistQueue(): State<
  { openedPlaylistQueueSorted: OpenedPlaylistQueue },
  UseOpenedPlaylistQueueOps
> {
  const [, setOpenedPlaylistQueue] = useAtom(openedPlaylistQueueAtom);
  const [openedPlaylistQueueSorted] = useAtom(openedPlaylistQueueSortedAtom);

  return [
    { openedPlaylistQueueSorted },
    {
      setOpenedPlaylistQueue(playlistQueue) {
        setOpenedPlaylistQueue(playlistQueue);
      }
    }
  ];
}
