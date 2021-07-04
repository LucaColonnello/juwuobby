import SongsPicker from "./SongsPicker";
import useOpenedPlaylistSongs from "../../state/openedPlaylistSongs";

export default function PlaylistSongs() {
  const [{ openedPlaylistSongs }] = useOpenedPlaylistSongs();

  return (
    <>
      <div className="PlaylistSongs">
        {openedPlaylistSongs === null && <SongsPicker />}
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
