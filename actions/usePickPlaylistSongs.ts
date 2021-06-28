import { useState } from 'react';
import * as FileSystemService from '../services/FileSystem';
import waitFor from '../utils/waitFor';
import type { StatefullAction } from '../types';

// order matters
export enum PickPlaylistSongsStages {
  idle = "idle",
  pickingDir = "pickingDir",
  loadingFiles = "loadingFiles",
  computingData = "computingData",
};

export default function usePickPlaylistSongs():
StatefullAction<{ currentStage: PickPlaylistSongsStages }, () => Promise<void>> {
  const [currentStage, setCurrentStage] =
    useState<PickPlaylistSongsStages>(PickPlaylistSongsStages.idle);

  return [
    { currentStage },
    async function pickPlaylistSongs() {
      try {
        setCurrentStage(PickPlaylistSongsStages.pickingDir);
        const directoryHandle = await FileSystemService.pickDirectory();
        await waitFor(1000);
  
        setCurrentStage(PickPlaylistSongsStages.loadingFiles);
        const files = await FileSystemService.getFilesFromDirectory(directoryHandle, true);
        await waitFor(1000);
        
        setCurrentStage(PickPlaylistSongsStages.computingData);
      } finally {
        setCurrentStage(PickPlaylistSongsStages.idle);
      }
    },
  ];
}
