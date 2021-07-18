import { memo } from "react";
import { Atom, Provider } from "jotai";


import Header from "./Header";
import CurrentDirNavigableList from "./CurrentDirNavigableList";
import { currentPlaylistSongsAtom } from "./state";

import type { PlaylistSongs } from "../../types";

export interface SongsNavigatorProps {
  playlistSongs: PlaylistSongs;
}

type InitialValues = Array<[Atom<PlaylistSongs>, PlaylistSongs]>;

function SongsNavigator({ playlistSongs }: SongsNavigatorProps) {
  const initialValues: InitialValues = [[currentPlaylistSongsAtom, playlistSongs]];

  return (
    <Provider initialValues={initialValues}>
      <div className="HeaderContainer">
        <Header />
      </div>

      <CurrentDirNavigableList />

      <style jsx>{`
        .HeaderContainer {
          margin-bottom: 32px;
        }
      `}</style>
    </Provider>
  );
}

export default memo(SongsNavigator);
