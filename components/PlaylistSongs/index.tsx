import { Typography, List } from "antd";
import useOpenedPlaylistSongs from "../../state/openedPlaylistSongs";

const { Title } = Typography;

export default function PlaylistSongs() {
  const [openedPlaylistSongs] = useOpenedPlaylistSongs();

  return (
    <>
      <div className="PlaylistSongs">
        {openedPlaylistSongs === null && <>Naaah is null</>}
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
