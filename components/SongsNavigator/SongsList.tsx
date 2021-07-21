import { useAtomValue } from "jotai/utils";
import { List } from 'antd';

import { currentPlaylistSongsAtom } from "./state";
import SongListItem from "../SongListItem";

import type { ReactNode } from "react";
import type { Song, SongHash } from '../../types';

export interface SongsListProps {
  songs: SongHash[];
  getActions?: (song: Song) => ReactNode[];
  onClick?: (song: Song) => void;
  onDoubleClick?: (song: Song) => void;
}

export default function SongsList({
  songs = [],
  getActions,
  onClick = () => {},
  onDoubleClick = () => {},
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
          <SongListItem
            song={song}
            getActions={getActions}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
          />
        );
      }}
    />
  );
}
