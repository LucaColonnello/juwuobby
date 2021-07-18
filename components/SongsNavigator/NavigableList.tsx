import { Empty, Typography } from 'antd';

import LoadingSpinner from "../LoadingSpinner";
import DirsList from './DirsList';
import SongsList from './SongsList';

import type { Dir, Song } from '../../types';

const { Text } = Typography;

export interface NavigableListProps {
  dir: Dir;
  onDirClick?: (dir: Dir) => void;
  onSongClick?: (song: Song) => void;
}

export default function NavigableList({
  dir = null,
  onDirClick = () => {},
  onSongClick = () => {},
}: NavigableListProps) {
  if (dir === null) {
    return (
      <LoadingSpinner />
    );
  }

  let dirsList = null;
  let songsList = null;

  if (dir.dirs.length) {
    dirsList = (<DirsList dirs={dir.dirs} onClick={onDirClick} />);
  }

  if (dir.songs.length) {
    songsList = (<SongsList songs={dir.songs} onClick={onSongClick} />);
  }

  if (dirsList === null && songsList === null) {
    return (
      <Empty
        description={<Text type="secondary">Nothing in this folder</Text>}
      />
    );
  }

  return (
    <>
      {dirsList}
      {songsList}
    </>
  );
}
