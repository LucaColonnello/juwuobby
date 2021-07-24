import { notification, message } from "antd";

import getSongContextMenu, { MenuItemKeys } from "./getSongContextMenu";
import { useAddSongToPlaylistQueue, usePlaySong } from "../../../actions";

import type { Song } from "../../../types";

const messages: Record<MenuItemKeys, [string, string]> = {
  [MenuItemKeys.add_to_queue]: [
    "Added to queue",
    "There was an error while adding this song to the queue. Please contact the monkey developer 🐒 ."
  ],
  [MenuItemKeys.play_now]: [
    "Playing now",
    "There was an error while playing this song. Please contact the monkey developer 🐒 ."
  ],
};

export default function useSongContextMenu() {
  const addSongToPlaylistQueue = useAddSongToPlaylistQueue();
  const playSong = usePlaySong();

  const commands: Record<MenuItemKeys, (song: Song) => Promise<void>> = {
    [MenuItemKeys.add_to_queue]: async (song) => {
      await addSongToPlaylistQueue(song);
    },
    [MenuItemKeys.play_now]: async (song) => {
      await playSong(song);
    },
  };

  const onContextMenuClick = (song, key) => {
    const [successText, errorText] = messages[key];

    commands[key](song)
      .then(() => {
        message.success(successText);
      })
      .catch((error) => {
        console.error(error);
        notification.error({
          key: "playlist_songs_command_error",
          message: "Oh snap!",
          description: errorText,
          duration: 5
        });
      });
  };

  return getSongContextMenu(onContextMenuClick);
}
