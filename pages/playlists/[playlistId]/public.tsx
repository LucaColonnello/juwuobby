import { useEffect } from "react";
import { useRouter } from "next/router";
import { Result, PageHeader } from "antd";

import LoadingSpinner from "../../../components/LoadingSpinner";
import PublicPlaylistSongs from "../../../components/PublicPlaylistSongs";

import { useLoadRemotePlaylist } from "../../../actions";
import useOpenedPlaylist from "../../../state/openedPlaylist";

import { PlaylistID } from "../../../types";

export default function PlaylistPublicPage() {
  const router = useRouter();
  const [openedPlaylist] = useOpenedPlaylist();
  const loadRemotePlaylist = useLoadRemotePlaylist();

  const { playlistId } = router.query as {
    playlistId: PlaylistID;
  };

  useEffect(() => {
    if (typeof playlistId === "undefined") {
      return;
    }

    loadRemotePlaylist(playlistId);
  }, [playlistId]);

  if (openedPlaylist === null) {
    return (
      <LoadingSpinner />
    );
  }

  if (!openedPlaylist) {
    return (
      <Result
        status="warning"
        title="The requested playlist cannot be found."
      />
    );
  }

  return (
    <div className="PlaylistPublicPage">
      <PageHeader
        title="⏯  Juwuobby"
        subTitle={openedPlaylist.name}
      />

      <div className="PlaylistPublicPageContent">
        <aside className="PlaylistQueueContainer">
          
        </aside>
        <section className="PlaylistSongsContainer">
          <PublicPlaylistSongs />
        </section>
      </div>

      <style jsx>{`
        .PlaylistPublicPage {
          position: relative;
        }

        .PlaylistPublicPageContent {
          position: relative;
          border-top: 1px solid #ccc;
          min-height: 100vh;
        }

        .PlaylistQueueContainer,
        .PlaylistSongsContainer {
          position: relative;
        }
      `}</style>
    </div>
  );
}
