import { useAtom } from "jotai";

import { asyncLocalPlaylists } from "../../state/localPlaylists";

export default function LocalPlaylistList() {
  const [localPlaylists] = useAtom(asyncLocalPlaylists);
  console.log(localPlaylists);

  return <p>{localPlaylists.length}</p>;
}
