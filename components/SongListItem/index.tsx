import { memo, ReactNode } from "react";
import { List } from "antd";
import { PlayCircleTwoTone } from "@ant-design/icons";

import type { Song } from "../../types";

const { Item } = List;

export interface SongListItemProps {
  song: Song;
  getActions?: (song: Song) => ReactNode[];
  onClick?: (song: Song) => void;
  onDoubleClick?: (song: Song) => void;
}

function SongListItem({
  song,
  onClick = () => {},
  onDoubleClick = () => {},
  getActions = () => [],
}: SongListItemProps) {
  return (
    <Item
      actions={getActions(song)}
      onDoubleClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        
        onDoubleClick(song);
      }}
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
}

export default memo(SongListItem);
