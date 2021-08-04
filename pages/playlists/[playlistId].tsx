import { Suspense, useEffect } from "react";
import { useRouter } from "next/router";
import { Result, Button, PageHeader } from "antd";

import withAuthContainer from "../../components/AuthContainer";
import SplitPane from "../../components/SplitPane";
import GenerateQRCodeButton from "../../components/GenerateQRCodeButton";
import DeletePlaylistButton from "../../components/DeletePlaylistButton";
import LoadingSpinner from "../../components/LoadingSpinner";
import PlaylistPlayer from "../../components/PlaylistPlayer";
import PlaylistSongs from "../../components/PlaylistSongs";

import { useLoadLocalPlaylist } from "../../actions";
import useLoggedInUser from "../../state/loggedInUser";
import useOpenedPlaylist from "../../state/openedPlaylist";
import canDeletePlaylist from "../../domain/services/canDeletePlaylist";

import type { PlaylistID } from "../../types";

function PlaylistPage() {
  const router = useRouter();
  const [loggedInUser] = useLoggedInUser();
  const [openedPlaylist] = useOpenedPlaylist();
  const loadLocalPlaylist = useLoadLocalPlaylist();

  const { playlistId } = router.query as {
    playlistId: PlaylistID;
  };

  useEffect(() => {
    loadLocalPlaylist(playlistId);
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
        title={
          <>
            The requested playlist cannot be found.
            <br />
            Did you create it using this computer?
          </>
        }
        extra={
          <Button
            onClick={() => {
              router.push("/");
            }}
          >
            Go to home
          </Button>
        }
      />
    );
  }

  return (
    <div className="PlaylistPage">
      <PageHeader
        onBack={() => router.push("/")}
        title="⏯  Juwuobby"
        subTitle={openedPlaylist.name}
        extra={[
          <GenerateQRCodeButton
            key="qrcode"
            playlist={openedPlaylist}
          />,
          (loggedInUser && canDeletePlaylist(loggedInUser, openedPlaylist)) ? (
            <DeletePlaylistButton
              key="delete"
              size="medium"
              playlist={openedPlaylist}
              onDelete={() => {
                router.push("/");
              }}
            />
          ) : null
        ]}
      />

      <div className="PlaylistPageContent">
        <SplitPane
          split="vertical"
          minSize={450}
          defaultSize={450}
          maxSize={650}
        >
          <aside className="PlaylistPlayerContainer">
            <PlaylistPlayer />
          </aside>
          <section className="PlaylistSongsContainer">
            <Suspense fallback={<LoadingSpinner />}>
              <PlaylistSongs />
            </Suspense>
          </section>
        </SplitPane>
      </div>

      <style jsx>{`
        .PlaylistPage {
          position: relative;
          height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .PlaylistPageContent {
          position: relative;
          flex-grow: 1;
          flex-shrink: 0;
          display: flex;
          border-top: 1px solid #ccc;
        }

        .PlaylistPlayerContainer,
        .PlaylistSongsContainer {
          position: relative;
          height: 100%;
          overflow: auto;
        }
      `}</style>
    </div>
  );
}

export default withAuthContainer(PlaylistPage);
