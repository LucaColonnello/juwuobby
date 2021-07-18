import { useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";

import LoadingSpinner from "../LoadingSpinner";
import NavigableList from './NavigableList';

import { currentDirAtom, navigateForwardAtom } from "./state";

import type { Dir } from "../../types";

export default function CurrentDirNavigableList() {
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
    />
  );
}
