import Link from "next/link";

import { List, Typography } from "antd";

import { LoadingSpinnerIcon } from "../LoadingSpinner";
import DeletePlaylistButton from "../DeletePlaylistButton";

import useLocalPlaylists from "../../state/localPlaylists";
import useLoggedInUser from "../../state/loggedInUser";
import canDeletePlaylist from "../../domain/services/canDeletePlaylist";

import type { Playlist } from "../../types";

const { Text } = Typography;

export default function LocalPlaylistsList() {
  const [loggedInUser] = useLoggedInUser();
  const [localPlaylists] = useLocalPlaylists();

  return (
    <List
      header={<Text strong>Local playlists: {localPlaylists?.length}</Text>}
      bordered
      dataSource={localPlaylists || []}
      loading={localPlaylists === null ? { indicator: LoadingSpinnerIcon } : false}
      renderItem={(item: Playlist) => {
        const actions = [];
        if (loggedInUser && canDeletePlaylist(loggedInUser, item)) {
          actions.push(<DeletePlaylistButton playlist={item} />);
        }

        return (
          <List.Item actions={actions}>
            <Link href={`/playlists/${item.id}`}>{item.name}</Link>
          </List.Item>
        );
      }}
    />
  );
}
