import { List } from 'antd';
import { PlayCircleTwoTone } from '@ant-design/icons';

import type { Song } from '../../types';

const { Item } = List;

export interface SongsListProps {
  songs: Song[];
  onClick?: (song: Song) => void;
}

export default function SongsList({
  songs = [],
  onClick = () => {},
}: SongsListProps) {
  if (!songs.length) {
    return null;
  }

  return (
    <List
      size="large"
      dataSource={songs}
      renderItem={item => (
        <Item
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            
            onClick(item);
          }}
          style={{ cursor: "pointer" }}
        >
          <Item.Meta
            avatar={<PlayCircleTwoTone />}
            title={item.name}
          />
        </Item>
      )}
    />
  );
}
