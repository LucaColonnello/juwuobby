import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Result, PageHeader, Typography } from "antd";
import { UnorderedListOutlined, CloseOutlined } from "@ant-design/icons";
import cx from "classname";

import LoadingSpinner from "../../../components/LoadingSpinner";
import PublicPlaylistSongs from "../../../components/PublicPlaylistSongs";
import PlaylistQueue from "../../../components/PlaylistQueue";

import { useLoadRemotePlaylist } from "../../../actions";
import useOpenedPlaylist from "../../../state/openedPlaylist";

import { PlaylistID } from "../../../types";

const { Title } = Typography;

export default function PlaylistPublicPage() {
  const [queueOpened, setQueueOpened] = useState(false);
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
    <>
      <div className="PlaylistPublicPage">
        <div className="PlaylistPublicPageHeader">
          <PageHeader
            title="⏯  Juwuobby"
            extra={[
              <Button
                icon={<UnorderedListOutlined />}
                onClick={() => {
                  setQueueOpened(true);
                }}
              />
            ]}
          />
        </div>

        <div className="PlaylistPublicPageContent">
          <section className="PlaylistPublicPageTitle">
            <Title>{openedPlaylist.name}</Title>
          </section>

          <PublicPlaylistSongs />
        </div>
      </div>

      <div
        className={cx("PlaylistPublicQueueContainer", {
          "opened": queueOpened,
        })}
      >
        <PlaylistQueue compact={!queueOpened} />

        <div className="PlaylistPublicQueueCloseBtn">
          <Button
            icon={<CloseOutlined />}
            onClick={() => {
              setQueueOpened(false);
            }}
          />
        </div>
      </div>

      <style jsx>{`
        .PlaylistPublicPage {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .PlaylistPublicPageHeader {
          position: relative;
          
          overflow: hidden;
          border-bottom: 1px solid #ccc;
        }

        .PlaylistPublicPageContent {
          position: relative;
          flex-grow: 1;
          flex-shrink: 0;
          padding-bottom: 100px;
        }

        .PlaylistPublicPageTitle {
          position: relative;
          margin: 16px;
        }

        .PlaylistPublicQueueContainer {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          height: 100px;

          background-color: #fff;
          border-top: 1px solid #ccc;
        }

        .PlaylistPublicQueueCloseBtn {
          position: absolute;
          top: 16px;
          right: 16px;
          display: none;
        }

        .PlaylistPublicQueueContainer.opened {
          top: 0;
          height: unset;
          overflow: auto;
          border-top: unset;
        }

        .PlaylistPublicQueueContainer.opened >
        .PlaylistPublicQueueCloseBtn {
          display: block;
        }
      `}</style>
    </>
  );
}
