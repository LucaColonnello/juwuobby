import { useState } from "react";

import * as FileSystemService from "../utils/FileSystem";
import waitFor from "../utils/waitFor";

import * as PlaylistsRepository from "../repositories/Playlists";
import * as LocalPlaylistsRepository from "../repositories/LocalPlaylists";

import useLoggedInUser from "../state/loggedInUser";
import useOpenedPlaylist from "../state/openedPlaylist";
import useOpenedPlaylistSongs from "../state/openedPlaylistSongs";

import { createPlaylistSongsFromDirAndFiles } from "../domain/entities/playlistSongs";
import validateFileHandleByName from "../domain/services/validateFileHandleByName";
import canAddSongsToPlaylist from "../domain/services/canAddSongsToPlaylist";

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
  const [loggedInUser] = useLoggedInUser();
  const [openedPlaylist] = useOpenedPlaylist();
  const [, { setOpenedPlaylistSongs }] = useOpenedPlaylistSongs();

  return [
    { currentStage },
    async function pickPlaylistSongs() {
      if (loggedInUser === null || loggedInUser === false) {
        throw new Error("Cannot add songs to playlist. Missing logged in user.");
      }
  
      if (
        openedPlaylist === null ||
        openedPlaylist === false
      ) {
        return;
      }
  
      if (!canAddSongsToPlaylist(loggedInUser, openedPlaylist)) {
        throw new Error("Logged in user does not have permissions to add songs to this playlist.");
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
        await PlaylistsRepository.emptyPlaylistSongs(openedPlaylist.id);
        await PlaylistsRepository.savePlaylistSongs(openedPlaylist.id, playlistSongs);
        await LocalPlaylistsRepository.saveLocalPlaylistSongs(playlistSongs);
        await waitFor(1000);

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
