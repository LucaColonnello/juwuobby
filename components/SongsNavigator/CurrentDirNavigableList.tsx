import { useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";

import LoadingSpinner from "../LoadingSpinner";
import NavigableList from './NavigableList';

import { currentDirAtom, navigateForwardAtom } from "./state";

import type { ReactElement, ReactNode } from "react";
import type { Dir, Song } from "../../types";

export interface CurrentDirNavigableListProps {
  onSongClick?: (song: Song) => void;  
  onSongDoubleClick?: (song: Song) => void;  
  getSongActions?: (song: Song) => ReactNode[];
  getSongContextMenu?: (song: Song) => ReactElement;
}

export default function CurrentDirNavigableList({
  onSongClick,
  onSongDoubleClick,
  getSongActions,
  getSongContextMenu,
}: CurrentDirNavigableListProps) {
  const [currentDir] = useAtom(currentDirAtom);
  const navigateForward = useUpdateAtom(navigateForwardAtom);


  const onDirClick = (dir: Dir) => {
    navigateForward(dir);
  };

  if (currentDir === null) {
    return (<LoadingSpinner />);
  }

  return (
    <NavigableList
      dir={currentDir}
      onDirClick={onDirClick}
      onSongClick={onSongClick}
      onSongDoubleClick={onSongDoubleClick}
      getSongActions={getSongActions}
      getSongContextMenu={getSongContextMenu}
    />
  );
}
