import { ReactElement } from "react";
import { Typography, List, Menu } from "antd";
import cx from "classname";

import SongListItem from "../SongListItem";

import { usePlaylistQueueSubscription } from "../../effects";
import useOpenedPlaylistQueue from "../../state/openedPlaylistQueue";
import useOpenedPlaylistSongs from "../../state/openedPlaylistSongs";

import type { PlaylistQueueItem, Song } from "../../types";

const { Title } = Typography;

export interface PlaylistQueueProps {
  compact?: boolean,
  getSongContextMenu?: (playlistQueueItem: PlaylistQueueItem) => ReactElement<Menu>;
}

export default function PlaylistQueue({
  compact = false,
  getSongContextMenu
}: PlaylistQueueProps) {
  const [{ openedPlaylistSongs }] = useOpenedPlaylistSongs();
  const [{ openedPlaylistQueueSorted }] = useOpenedPlaylistQueue();

  usePlaylistQueueSubscription();

  if (openedPlaylistQueueSorted === null || !openedPlaylistQueueSorted.length) {
    return <List locale={{ emptyText: "0 songs in the queue" }} />;
  }

  const { songsByHash } = openedPlaylistSongs;

  const upNextInQueue = openedPlaylistQueueSorted[0];

  const renderListItem = (playlistQueueItem: PlaylistQueueItem) => {
    if (!songsByHash.has(playlistQueueItem.songHash)) {
      return null;
    }

    const song = songsByHash.get(playlistQueueItem.songHash);

    return (
      <SongListItem
        song={song}
        getContextMenu={
          getSongContextMenu ?
            () => getSongContextMenu(playlistQueueItem) :
            undefined
        }
      />
    );
  };

  return (
    <>
      <section className={cx(
        "PlaylistPlayerQueueTitle",
        {
          "compact": compact
        }
      )}>
        <Title type="secondary" level={compact ? 5 : 4}>
          Up next
        </Title>
      </section>

      <List
        size={compact ? "small" : "large"}
        dataSource={[upNextInQueue]}
        renderItem={renderListItem}
      />

      <section className={cx(
        "PlaylistPlayerQueueTitle",
        {
          "compact": compact
        }
      )}>
        <Title type="secondary" level={compact ? 5 : 4}>
          In the queue
        </Title>
      </section>

      <List
        size={compact ? "small" : "large"}
        dataSource={openedPlaylistQueueSorted.slice(1)}
        renderItem={renderListItem}
      />

      <style jsx>{`
        .PlaylistPlayerQueueTitle {
          margin: 16px;
        }

        .PlaylistPlayerQueueTitle.compact {
          margin: 10px 16px;
        }
      `}</style>
    </>
  );
}
