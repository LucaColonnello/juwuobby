import { useRouter } from "next/router";
import { Result, Button } from "antd";

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
            type="primary"
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

  return <div>This will be the Playlist page {playlistId}</div>;
}
