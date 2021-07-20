import { Typography, List } from "antd";

import useOpenedPlaylistQueue from "../../state/openedPlaylistQueue";
import useOpenedPlaylistSongs from "../../state/openedPlaylistSongs";

import SongListItem from "../SongListItem";

const { Title } = Typography;

export default function PlaylistPlayerQueue() {
  const [{ openedPlaylistSongs }] = useOpenedPlaylistSongs();
  const [{ openedPlaylistQueueSorted }] = useOpenedPlaylistQueue();

  if (openedPlaylistQueueSorted === null || !openedPlaylistQueueSorted.length) {
    return <List locale={{ emptyText: "0 songs in the queue" }} />;
  }

  const { songsByHash } = openedPlaylistSongs;

  const upNextInQueue = openedPlaylistQueueSorted[0];

  const renderListItem = playlistQueueItem => {
    if (!songsByHash.has(playlistQueueItem.songHash)) {
      return null;
    }

    const song = songsByHash.get(playlistQueueItem.songHash);

    return (
      <SongListItem song={song} />
    );
  };

  return (
    <>
      <section className="PlaylistPlayerQueueTitle">
        <Title type="secondary" level={4}>
          Up next
        </Title>
      </section>

      <List
        size="large"
        dataSource={[upNextInQueue]}
        renderItem={renderListItem}
      />

      <section className="PlaylistPlayerQueueTitle">
        <Title type="secondary" level={4}>
          In the queue
        </Title>
      </section>

      <List
        size="large"
        dataSource={openedPlaylistQueueSorted.slice(1)}
        renderItem={renderListItem}
      />

      <style jsx>{`
        .PlaylistPlayerQueueTitle {
          margin: 16px;
        }
      `}</style>
    </>
  );
}
