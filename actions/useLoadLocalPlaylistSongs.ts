import { Modal } from "antd";
import * as FileSystemService from "../utils/FileSystem";

import * as LocalPlaylistsRepository from "../repositories/LocalPlaylists";
import useOpenedPlaylist from "../state/openedPlaylist";
import useOpenedPlaylistSongs from "../state/openedPlaylistSongs";

import { addPlaylistSongsSongFiles } from "../domain/entities/playlistSongs";

import type { Action } from "../types";

export default function useLoadLocalPlaylistSongs(): Action<() => Promise<void>> {
  const [openedPlaylist] = useOpenedPlaylist();
  const [, { setOpenedPlaylistSongs }] = useOpenedPlaylistSongs();

  return async function loadLocalPlaylistSongs() {
    if (openedPlaylist === false || openedPlaylist === null) {
      return;
    }

    let playlistSongs = await LocalPlaylistsRepository.getLocalPlaylistSongsById(openedPlaylist.id);
    if (playlistSongs === null) {
      return;
    }

    Modal.confirm({
      title: 'Do you want to load the playlist files?',
      content: 'Juwuobby needs access to your file system to load your songs.',
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        try {
          if (!await FileSystemService.verifyPermission(playlistSongs.dirHandle, false)) {
            return;
          }
  
          const files = await FileSystemService.getFilesFromDirectory(playlistSongs.dirHandle, true);
          playlistSongs = addPlaylistSongsSongFiles(playlistSongs, files);
      
          setOpenedPlaylistSongs(playlistSongs);
        } catch (error) {
          console.error(error);
        }
      }
    });
  };
}
