import { memo } from "react";
import { Atom, Provider } from "jotai";


import Header from "./Header";
import CurrentDirNavigableList from "./CurrentDirNavigableList";
import { currentPlaylistSongsAtom } from "./state";

import type { PlaylistSongs, Song } from "../../types";

export interface SongsNavigatorProps {
  playlistSongs: PlaylistSongs;
  onSongClick?: (song: Song) => void;
  onSongDoubleClick?: (song: Song) => void;
}

type InitialValues = Array<[Atom<PlaylistSongs>, PlaylistSongs]>;

function SongsNavigator({
  playlistSongs,
  onSongClick = () => {},
  onSongDoubleClick = () => {},
}: SongsNavigatorProps) {
  const initialValues: InitialValues = [[currentPlaylistSongsAtom, playlistSongs]];

  return (
    <Provider initialValues={initialValues}>
      <div className="HeaderContainer">
        <Header />
      </div>

      <CurrentDirNavigableList
        onSongClick={onSongClick}
        onSongDoubleClick={onSongDoubleClick}
      />

      <style jsx>{`
        .HeaderContainer {
          margin-bottom: 32px;
        }
      `}</style>
    </Provider>
  );
}

export default memo(SongsNavigator);
