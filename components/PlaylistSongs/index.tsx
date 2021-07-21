import { useEffect } from "react";
import { notification } from "antd";

import { usePlaySong } from "../../actions";

import SongsPicker from "./SongsPicker";
import SongsNavigator from "../SongsNavigator";

import { useLoadLocalPlaylistSongs } from "../../actions";
import useOpenedPlaylistSongs from "../../state/openedPlaylistSongs";
import AddSongToQueueButton from "../AddSongToQueueButton";

export default function PlaylistSongs() {
  const [{ openedPlaylistSongs }] = useOpenedPlaylistSongs();
  const loadLocalPlaylistSongs = useLoadLocalPlaylistSongs();
  const playSong = usePlaySong();

  const loadPlaylistSongs = async () => {
    try {
      await loadLocalPlaylistSongs();
    } catch (error) {
      console.error(error);
      notification.error({
        key: "playlist_songs_error",
        message: "Oh snap!",
        description:
          "There was an error while loading your playlist. Please contact the monkey developer 🐒 .",
        duration: 5
      });
    }
  };

  useEffect(() => {
    loadPlaylistSongs();
  }, []);

  return (
    <>
      <div className="PlaylistSongs">
        {openedPlaylistSongs === null && <SongsPicker />}
        {openedPlaylistSongs !== null && (
          <SongsNavigator
            playlistSongs={openedPlaylistSongs}
            onSongDoubleClick={playSong}
            getSongActions={(song) => [
              <AddSongToQueueButton key="addToQueueAction" song={song} />
            ]}
          />
        )}
      </div>

      <style jsx>{`
        .PlaylistSongs {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
      `}</style>
    </>
  );
}
