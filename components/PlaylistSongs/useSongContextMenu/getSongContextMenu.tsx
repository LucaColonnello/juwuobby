import { Menu } from "antd";

import type { ReactElement } from "react";
import type { Song } from "../../../types";

export enum MenuItemKeys {
  add_to_queue = "add_to_queue",
  play_now = "play_now",
}

type OnContextMenuClick = (song: Song, key: MenuItemKeys) => void;
type GetSongContextMenu =
  (onContextMenuClick: OnContextMenuClick) => (song: Song) => ReactElement<Menu>;

const getSongContextMenu: GetSongContextMenu = (onContextMenuClick) => (song) => {
  return (
    <Menu
      theme="dark"
      onClick={({ key }) => {
        onContextMenuClick(song, key as MenuItemKeys);
      }}
      selectable={false}
    >
      <Menu.Item key={MenuItemKeys.add_to_queue}>Add to queue</Menu.Item>
      <Menu.Item key={MenuItemKeys.play_now}>Play now</Menu.Item>
    </Menu>
  );
}

export default getSongContextMenu;
