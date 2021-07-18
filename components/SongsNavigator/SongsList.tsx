import { useAtomValue } from "jotai/utils";
import { List } from 'antd';
import { PlayCircleTwoTone } from '@ant-design/icons';

import { currentPlaylistSongsAtom } from "./state";

import type { Song, SongHash } from '../../types';

const { Item } = List;

export interface SongsListProps {
  songs: SongHash[];
  onClick?: (song: Song) => void;
}

export default function SongsList({
  songs = [],
  onClick = () => {},
}: SongsListProps) {
  const playlistSongs = useAtomValue(currentPlaylistSongsAtom);

  if (!songs.length || playlistSongs === null) {
    return null;
  }

  const { songsByHash } = playlistSongs;

  return (
    <List
      size="large"
      dataSource={songs}
      renderItem={songHash => {
        if (!songsByHash.has(songHash)) {
          return null;
        }

        const song = songsByHash.get(songHash);

        return (
          <Item
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              
              onClick(song);
            }}
            style={{ cursor: "pointer" }}
          >
            <Item.Meta
              avatar={<PlayCircleTwoTone />}
              title={song.name}
            />
          </Item>
        );
      }}
    />
  );
}
