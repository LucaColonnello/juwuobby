import { usePlaylistQueueSubscription } from "../../effects";

import PlaylistPlayerControls from "./PlaylistPlayerControls";
import PlaylistPlayerQueue from "./PlaylistPlayerQueue";

export default function PlaylistPlayer() {
  usePlaylistQueueSubscription();

  return (
    <>
      <div className="PlaylistPlayer">
        <div className="PlaylistPlayerControlsContainer">
          <PlaylistPlayerControls />
        </div>
        <div className="PlaylistPlayerQueueContainer">
          <PlaylistPlayerQueue />
        </div>
      </div>
      <style jsx>{`
        .PlaylistPlayer {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .PlaylistPlayerControlsContainer {
          border-botton: 1px solid #ddd;
        }

        .PlaylistPlayerQueueContainer {
          flex-shrink: 0;
          flex-grow: 1;
          overflow: auto;
        }
      `}</style>
    </>
  );
}
