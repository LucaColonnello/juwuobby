import { memo, ReactElement, ReactNode } from "react";
import { List, Dropdown, Menu } from "antd";
import { PlayCircleTwoTone, MoreOutlined } from "@ant-design/icons";
import css from 'styled-jsx/css';
import cx from "classname";

import type { Song } from "../../types";

const { Item } = List;

export interface SongListItemProps {
  song: Song;
  onClick?: (song: Song) => void;
  onDoubleClick?: (song: Song) => void;
  getActions?: (song: Song) => ReactNode[];
  getContextMenu?: (song: Song) => ReactElement<Menu>;
}

function SongListItem({
  song,
  onClick = () => {},
  onDoubleClick = () => {},
  getActions = () => [],
  getContextMenu = () => null,
}: SongListItemProps) {
  const contextMenu = getContextMenu(song);
  const actions = [...getActions(song)];

  if (contextMenu !== null) {
    actions.push(
      <Dropdown.Button
        buttonsRender={([, right]) => [null, right]}
        overlay={contextMenu}
        trigger={["click"]}
        // @ts-ignore
        // drowpdown type in AntDesign is a mirror of the Button type,
        // but it hasn't been updated to reflect all the Button types
        // although the component supports all the types at runtime
        type="text"
        icon={<MoreOutlined style={{ transform: "rotate(90deg)" }}
      />} />
    );
  }

  const itemMeta = (
    <Item.Meta
      avatar={<PlayCircleTwoTone />}
      title={song.name}
    />
  );

  return (
    <>
      <Item
        className={cx(ItemStyle.className, "SongListItem")}
        actions={actions}
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
        style={{ cursor: "default" }}
      >
        {contextMenu !== null ? (
          <Dropdown overlay={contextMenu} trigger={['contextMenu']}>
            {itemMeta}
          </Dropdown>
        ) : itemMeta}
      </Item>
      {ItemStyle.styles}
    </>
  );
}

const ItemStyle = css.resolve`
  .SongListItem:hover {
    background: #fafafa;
  }
`;

export default memo(SongListItem);
