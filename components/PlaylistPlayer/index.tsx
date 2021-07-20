import { Typography } from "antd";
import AudioPlayer from "react-h5-audio-player";

import { usePlaylistQueueSubscription } from "../../effects";

import PlaylistPlayerQueue from "./PlaylistPlayerQueue";

import "react-h5-audio-player/lib/styles.css";

const { Title } = Typography;

export default function PlaylistPlayer() {
  usePlaylistQueueSubscription();

  return (
    <>
      <div className="PlaylistPlayer">
        <div className="PlaylistPlayerControlsContainer">
          <AudioPlayer
            layout="stacked"
            header={
              <Title type="secondary" level={3}>
                Nothing is playing...
              </Title>
            }
          />
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
