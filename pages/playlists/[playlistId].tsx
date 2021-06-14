import { useRouter } from "next/router";
import { Result, Button, PageHeader } from "antd";

import DeletePlaylistButton from "../../components/DeletePlaylistButton";
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
    <PageHeader
      onBack={() => router.push("/")}
      title="⏯  Juwuobby"
      subTitle={localPlaylist.name}
      extra={[
        <DeletePlaylistButton
          key="delete"
          playlist={localPlaylist}
          onDelete={() => {
            router.push("/");
          }}
        />
      ]}
    >
      Whateveer
    </PageHeader>
  );
}
