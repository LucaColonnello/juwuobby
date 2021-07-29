import PlaylistQueue from "../PlaylistQueue";
import useSongContextMenu from "./useSongContextMenu";

export default function PlaylistPlayerQueue() {
  const getSongContextMenu = useSongContextMenu();

  return (<PlaylistQueue getSongContextMenu={getSongContextMenu} />);
}
