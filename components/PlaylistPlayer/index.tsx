import { Typography, List } from "antd";
import AudioPlayer from "react-h5-audio-player";

import "react-h5-audio-player/lib/styles.css";

const { Title } = Typography;

export default function PlaylistPlayer() {
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
          <List locale={{ emptyText: "0 songs in the queue" }} />
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
        }
      `}</style>
    </>
  );
}
