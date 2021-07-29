import { useEffect, useState } from "react";
import { notification, Result } from "antd";

import { useLoadRemotePlaylistSongs } from "../../actions";
import useOpenedPlaylistSongs from "../../state/openedPlaylistSongs";

import LoadingSpinner from "../../components/LoadingSpinner";

import SongsNavigator from "../SongsNavigator";
import useSongContextMenu from "./useSongContextMenu";

export default function PlaylistSongs() {
  const [loading, setLoading] = useState(true);
  const [{ openedPlaylistSongs }] = useOpenedPlaylistSongs();
  const loadRemotePlaylistSongs = useLoadRemotePlaylistSongs();

  const getSongContextMenu = useSongContextMenu();

  useEffect(() => {
    loadRemotePlaylistSongs()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(true);

        console.error(error);
        notification.error({
          key: "public_playlist_songs_error",
          message: "Oh snap!",
          description:
            "There was an error while loading your playlist. Please contact the monkey developer 🐒 .",
          duration: 5
        });
      });
  }, []);

  if (loading) {
    return (<LoadingSpinner />);
  }

  return (
    <>
      <div className="PublicPlaylistSongs">
        {openedPlaylistSongs === null && (
          <Result
            status="warning"
            title="The requested playlist cannot be found."
          />
        )}
        {openedPlaylistSongs !== null && (
          <SongsNavigator
            playlistSongs={openedPlaylistSongs}
            getSongContextMenu={getSongContextMenu}
          />
        )}
      </div>

      <style jsx>{`
        .PublicPlaylistSongs {
          position: relative;
        }
      `}</style>
    </>
  );
}
