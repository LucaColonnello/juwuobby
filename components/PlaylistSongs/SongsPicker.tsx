import {
  Result,
  Button,
  Typography,
  Progress,
  notification
} from "antd";
import { UploadOutlined } from  "@ant-design/icons";

import { usePickPlaylistSongs, PickPlaylistSongsStages } from "../../actions";

const { Paragraph, Text } = Typography;

const processStagesList = Object.values(PickPlaylistSongsStages)
  .filter((stage) => stage !== PickPlaylistSongsStages.idle);
const processStageStepPercentage = 100 / processStagesList.length;

const processStagesLabel = {
  pickingDir: "Pick the songs from your local computer",
  loadingFiles: "Loading your songs from the file system",
  computingData: "Computing. Just a little while more...",
};

export default function SongsPicker() {
  const [{ currentStage }, pickPlaylistSongs] = usePickPlaylistSongs();

  const onPickSongsClicked = async () => {
    try {
      await pickPlaylistSongs();
    } catch (error) {
      console.error(error);
      notification.error({
        key: "playlist_songs_error",
        message: "Oh snap!",
        description:
          "There was an error while adding songs to your playlist. Please contact the monkey developer 🐒 .",
        duration: 5
      });
    }
  };

  return (
    <Result
      status="info"
      title="Add songs to your playlist!"
      subTitle="You can choose any folder from you computer"
      extra={
        <Button
          type="primary"
          onClick={() => onPickSongsClicked().catch()}
          disabled={currentStage !== PickPlaylistSongsStages.idle}
          icon={<UploadOutlined />}
        >
          Pick your songs
        </Button>
      }
    >
      {currentStage !== PickPlaylistSongsStages.idle && (
        <>
          <Progress
            percent={(processStagesList.indexOf(currentStage) + 1) * processStageStepPercentage}
            showInfo={false}
          />
          <Paragraph type="secondary">
            <Text>{processStagesLabel[currentStage]}</Text>
          </Paragraph>
        </>
      )}
    </Result>
  );
}
