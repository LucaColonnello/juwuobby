import Link from "next/link";

import { List, Typography } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

import { LoadingSpinnerIcon } from "../LoadingSpinner";
import DeletePlaylistButton from "../DeletePlaylistButton";
import useLocalPlaylists from "../../state/localPlaylists";
import { Playlist } from "../../types";

const { Text } = Typography;

export default function LocalPlaylistsList() {
  const [localPlaylists] = useLocalPlaylists();

  return (
    <List
      header={<Text strong>Local playlists: {localPlaylists?.length}</Text>}
      bordered
      dataSource={localPlaylists || []}
      loading={localPlaylists === null ? { indicator: LoadingSpinnerIcon } : false}
      renderItem={(item: Partial<Playlist>) => (
        <List.Item actions={[<DeletePlaylistButton playlist={item} />]}>
          <Link href={`/playlists/${item.id}`}>{item.id}</Link>{" "}
          <Text>{item.name}</Text>
        </List.Item>
      )}
    />
  );
}
