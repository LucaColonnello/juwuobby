import { useState, useEffect } from "react";
import { Button, Typography, Modal } from "antd";
import { PlayCircleTwoTone, FullscreenOutlined } from "@ant-design/icons";
import AudioPlayer from "react-h5-audio-player";
import ReactPlayer from "react-player";

import useCurrentlyPlayingSong from "../../state/currentlyPlayingSong";
import { usePlayNextSong } from "../../actions";

import "react-h5-audio-player/lib/styles.css";

const { Title } = Typography;

export default function PlaylistPlayerControls() {
  const [currentlyPlayingSongSrc, setCurrentlyPlayingSongSrc] = useState<string>(null);
  const [isAudioFullscreen, setIsAudioFullscreen] = useState(false);
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

  // Display title for both audio and video
  const songTitleHeader = (
    <Title type="secondary" level={3}>
      {currentlyPlayingSong.name}
    </Title>
  );

  if (currentlyPlayingSong.type === "video") {
    return (
      <>
        {songTitleHeader}
        <ReactPlayer
          url={currentlyPlayingSongSrc}
          controls={true}
          playing={true}
          width="100%"
          height="360px" // Changed from "auto"
          onEnded={onEnded}
        />
      </>
    );
  } else { // Assume 'audio' or default to audio
    const audioPlayerComponent = (
      <AudioPlayer
        layout="stacked"
        header={songTitleHeader}
        showSkipControls={true}
        autoPlay
        src={currentlyPlayingSongSrc}
        autoPlayAfterSrcChange
        onClickNext={onClickNext}
        onEnded={onEnded}
        customAdditionalControls={[
          <Button key="fullscreen" onClick={() => setIsAudioFullscreen(true)} icon={<FullscreenOutlined />} />
        ]}
      />
    );

    return (
      <>
        {!isAudioFullscreen && audioPlayerComponent}

        <Modal
          title={songTitleHeader || "Audio Player"}
          visible={isAudioFullscreen}
          onCancel={() => setIsAudioFullscreen(false)}
          footer={null}
          width="90vw"
          destroyOnClose 
        >
          <AudioPlayer
            layout="stacked" 
            header={songTitleHeader} 
            showSkipControls={true}
            autoPlay 
            src={currentlyPlayingSongSrc}
            autoPlayAfterSrcChange
            onClickNext={() => {
              onClickNext();
            }}
            onEnded={() => {
              onEnded(); 
              setIsAudioFullscreen(false); 
            }}
          />
        </Modal>
      </>
    );
  }
}
