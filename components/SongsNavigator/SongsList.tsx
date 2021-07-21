import { useAtomValue } from "jotai/utils";
import { List } from 'antd';

import { currentPlaylistSongsAtom } from "./state";
import SongListItem from "../SongListItem";

import type { Song, SongHash } from '../../types';

export interface SongsListProps {
  songs: SongHash[];
  onClick?: (song: Song) => void;
  onDoubleClick?: (song: Song) => void;
}

export default function SongsList({
  songs = [],
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
            onClick={onClick}
            onDoubleClick={onDoubleClick}
          />
        );
      }}
    />
  );
}
