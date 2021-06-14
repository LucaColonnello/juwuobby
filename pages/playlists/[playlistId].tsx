import { useRouter } from "next/router";
import { Result, Button, PageHeader } from "antd";

import SplitPane from "../../components/SplitPane";
import DeletePlaylistButton from "../../components/DeletePlaylistButton";
import PlaylistPlayer from "../../components/PlaylistPlayer";
import useLocalPlaylists from "../../state/localPlaylists";

import { PlaylistID } from "../../types";

export default function PlaylistPage() {
  const router = useRouter();
  const [, { getLocalPlaylistById }] = useLocalPlaylists();

  const { playlistId } = router.query as {
    playlistId: PlaylistID;
  };

  const localPlaylist = getLocalPlaylistById(playlistId);

  if (!localPlaylist) {
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
        subTitle={localPlaylist.name}
        extra={[
          <DeletePlaylistButton
            key="delete"
            size="medium"
            playlist={localPlaylist}
            onDelete={() => {
              router.push("/");
            }}
          />
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
          <section className="PlaylistSongsContainer"></section>
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
        }
      `}</style>
    </div>
  );
}
