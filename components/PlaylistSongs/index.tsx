import { useEffect } from "react";
import { notification } from "antd";

import SongsPicker from "./SongsPicker";
import SongsNavigator from "../SongsNavigator";

import { useLoadLocalPlaylistSongs } from "../../actions";
import useOpenedPlaylistSongs from "../../state/openedPlaylistSongs";

export default function PlaylistSongs() {
  const [{ openedPlaylistSongs }] = useOpenedPlaylistSongs();
  const loadLocalPlaylistSongs = useLoadLocalPlaylistSongs();

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
        {openedPlaylistSongs !== null && <SongsNavigator playlistSongs={openedPlaylistSongs} />}
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
