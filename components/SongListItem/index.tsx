import { memo } from "react";
import { List } from "antd";
import { PlayCircleTwoTone } from "@ant-design/icons";

import type { Song } from "../../types";

const { Item } = List;

export interface SongListItemProps {
  song: Song;
  onClick?: (Song) => void;
}

function SongListItem({
  song,
  onClick = () => {},
}: SongListItemProps) {
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
}

export default memo(SongListItem);
