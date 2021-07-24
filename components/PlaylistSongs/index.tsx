import { useEffect } from "react";
import { notification } from "antd";

import { usePlaySong, useLoadLocalPlaylistSongs } from "../../actions";
import useOpenedPlaylistSongs from "../../state/openedPlaylistSongs";

import useSongContextMenu from "./useSongContextMenu";

import SongsPicker from "./SongsPicker";
import SongsNavigator from "../SongsNavigator";

export default function PlaylistSongs() {
  const [{ openedPlaylistSongs }] = useOpenedPlaylistSongs();
  const loadLocalPlaylistSongs = useLoadLocalPlaylistSongs();
  const playSong = usePlaySong();

  const getSongContextMenu = useSongContextMenu();

  useEffect(() => {
    loadLocalPlaylistSongs()
      .catch((error) => {
        console.error(error);
        notification.error({
          key: "playlist_songs_error",
          message: "Oh snap!",
          description:
            "There was an error while loading your playlist. Please contact the monkey developer 🐒 .",
          duration: 5
        });
      });
  }, []);

  return (
    <>
      <div className="PlaylistSongs">
        {openedPlaylistSongs === null && <SongsPicker />}
        {openedPlaylistSongs !== null && (
          <SongsNavigator
            playlistSongs={openedPlaylistSongs}
            onSongDoubleClick={playSong}
            getSongContextMenu={getSongContextMenu}
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
