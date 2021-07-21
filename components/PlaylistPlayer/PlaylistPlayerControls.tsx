import { useState, useEffect } from "react";
import { Button, Typography } from "antd";
import { PlayCircleTwoTone } from "@ant-design/icons";
import AudioPlayer from "react-h5-audio-player";

import useCurrentlyPlayingSong from "../../state/currentlyPlayingSong";
import { usePlayNextSong } from "../../actions";

import "react-h5-audio-player/lib/styles.css";

const { Title } = Typography;

export default function PlaylistPlayerControls() {
  const [currentlyPlayingSongSrc, setCurrentlyPlayingSongSrc] = useState<string>(null);
  const [{ currentlyPlayingSong }] = useCurrentlyPlayingSong();
  const playNextSong = usePlayNextSong();

  useEffect(() => {
    if (
      currentlyPlayingSong === null ||
      typeof currentlyPlayingSong.fileHandle === undefined
    ) {
      return;
    }

    const src = URL.createObjectURL(currentlyPlayingSong.fileHandle);
    setCurrentlyPlayingSongSrc(src);

    return () => {
      URL.revokeObjectURL(src);
    };
  }, [currentlyPlayingSong]);

  const onPlay = () => {
    if (currentlyPlayingSong === null) {
      playNextSong();
    }
  };

  const onClickNext = () => {
    playNextSong();
  };

  const onEnded = () => {
    playNextSong();
  };

  if (
    currentlyPlayingSong === null
  ) {
    return (
        <>
          <div className="NothingPlayingTitle">
            <Title type="secondary" level={3}>
              Nothing is playing...
            </Title>
          </div>

          <div className="NothingPlayingCta">
            <Button 
              type="text"
              shape="circle"
              icon={<PlayCircleTwoTone style={{ fontSize: "29px" }} />}
              size="large"
              onClick={onPlay}
            />
          </div>

          <style jsx>{`
            .NothingPlayingTitle {
              margin: 16px;
            }

            .NothingPlayingCta {
              text-align: center;
              margin: 32px 16px;
            }
          `}</style>
        </>
    );
  }

  return (
    <AudioPlayer
      layout="stacked"
      header={
        <Title type="secondary" level={3}>
          {currentlyPlayingSong.name}
        </Title>
      }
      showJumpControls={false}
      showSkipControls={true}
      customAdditionalControls={[]}
      autoPlay
      src={currentlyPlayingSongSrc !== null ? currentlyPlayingSongSrc : undefined}
      autoPlayAfterSrcChange
      onClickNext={onClickNext}
      onEnded={onEnded}
    />
  );
}
