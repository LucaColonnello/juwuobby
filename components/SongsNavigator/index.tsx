import { memo, ReactElement, ReactNode } from "react";
import { Menu } from "antd";
import { Atom, Provider } from "jotai";

import SearchOrNavigate from "./SearchOrNavigate";
import { currentPlaylistSongsAtom, songsNavigatorScope } from "./state";

import type { PlaylistSongs, Song } from "../../types";

export interface SongsNavigatorProps {
  playlistSongs: PlaylistSongs;
  onSongClick?: (song: Song) => void;
  onSongDoubleClick?: (song: Song) => void;
  getSongActions?: (song: Song) => ReactNode[];
  getSongContextMenu?: (song: Song) => ReactElement<Menu>;
}

type InitialValues = Array<[Atom<PlaylistSongs>, PlaylistSongs]>;

function SongsNavigator({
  playlistSongs,
  onSongClick = () => {},
  onSongDoubleClick = () => {},
  getSongActions,
  getSongContextMenu,
}: SongsNavigatorProps) {
  const initialValues: InitialValues = [[currentPlaylistSongsAtom, playlistSongs]];

  return (
    <Provider initialValues={initialValues} scope={songsNavigatorScope}>
      <SearchOrNavigate
        onSongClick={onSongClick}
        onSongDoubleClick={onSongDoubleClick}
        getSongActions={getSongActions}
        getSongContextMenu={getSongContextMenu}
      />
    </Provider>
  );
}

export default memo(SongsNavigator);
