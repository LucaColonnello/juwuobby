import { useState } from "react";

import * as FileSystemService from "../utils/FileSystem";
import waitFor from "../utils/waitFor";

import * as LocalPlaylists from "../repositories/LocalPlaylists";
import useOpenedPlaylist from "../state/openedPlaylist";
import useOpenedPlaylistSongs from "../state/openedPlaylistSongs";

import { createPlaylistSongsFromDirAndFiles } from "../domain/entities/playlistSongs";
import validateFileHandleByName from "../domain/services/validateFileHandleByName";

import type { StatefullAction } from "../types";

// order matters
export enum PickPlaylistSongsStages {
  idle = "idle",
  pickingDir = "pickingDir",
  loadingFiles = "loadingFiles",
  computingData = "computingData",
  syncWithServer = "syncWithServer",
};

export default function usePickPlaylistSongs(): StatefullAction<
  { currentStage: PickPlaylistSongsStages },
  () => Promise<void>
> {
  const [currentStage, setCurrentStage] =
    useState<PickPlaylistSongsStages>(PickPlaylistSongsStages.idle);
  const [openedPlaylist] = useOpenedPlaylist();
  const [, { setOpenedPlaylistSongs }] = useOpenedPlaylistSongs();

  return [
    { currentStage },
    async function pickPlaylistSongs() {
      if (openedPlaylist === false || openedPlaylist === null) {
        return;
      }

      try {
        setCurrentStage(PickPlaylistSongsStages.pickingDir);
        const directoryHandle = await FileSystemService.pickDirectory();
        await waitFor(1000);

        setCurrentStage(PickPlaylistSongsStages.loadingFiles);
        const files = await FileSystemService.getFilesFromDirectory(directoryHandle, true, validateFileHandleByName);
        await waitFor(1000);

        setCurrentStage(PickPlaylistSongsStages.computingData);
        const playlistSongs = createPlaylistSongsFromDirAndFiles(openedPlaylist.id, directoryHandle, files);
        await waitFor(1000);

        setCurrentStage(PickPlaylistSongsStages.syncWithServer);
        // TODO: online repository
        await waitFor(1000);

        LocalPlaylists.saveLocalPlaylistSongs(playlistSongs);
        setCurrentStage(PickPlaylistSongsStages.idle);
        setOpenedPlaylistSongs(playlistSongs);
      } catch (error) {
        setCurrentStage(PickPlaylistSongsStages.idle);
        if (error instanceof DOMException) {
          return;
        }

        throw error;
      }
    },
  ];
}
