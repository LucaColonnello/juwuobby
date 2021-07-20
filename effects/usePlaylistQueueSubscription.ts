import { useEffect } from "react";

import useOpenedPlaylist from "../state/openedPlaylist";
import useOpenedPlaylistQueue from "../state/openedPlaylistQueue";
import * as PlaylistQueueRepository from "../repositories/PlaylistsQueue";

import type { Effect } from "../types";

const usePlaylistQueueSubscription: Effect<() => void> = () => {
  const [openedPlaylist] = useOpenedPlaylist();
  const [, { setOpenedPlaylistQueue }] = useOpenedPlaylistQueue();

  useEffect(() => {
    if (openedPlaylist === null || openedPlaylist === false) {
      return;
    }

    const unsubscribe = PlaylistQueueRepository.subscribeToPlaylistQueue(
      openedPlaylist.id,
      setOpenedPlaylistQueue
    );

    return () => {
      unsubscribe();
    };
  }, [openedPlaylist]);
};

export default usePlaylistQueueSubscription;
