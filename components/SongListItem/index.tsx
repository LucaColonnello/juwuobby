import { memo } from "react";
import { List } from "antd";
import { PlayCircleTwoTone } from "@ant-design/icons";

import type { Song } from "../../types";

const { Item } = List;

export interface SongListItemProps {
  song: Song;
  onClick?: (Song) => void;
  onDoubleClick?: (Song) => void;
}

function SongListItem({
  song,
  onClick = () => {},
  onDoubleClick = () => {},
}: SongListItemProps) {
  return (
    <Item
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
