import Link from "next/link";

import { Button, List, Typography, Modal } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

import useDeletePlaylist from "../../actions/useDeletePlaylist";
import useLocalPlaylists from "../../state/localPlaylists";
import { Playlist } from "../../types";

const { Text } = Typography;

export default function LocalPlaylistsList() {
  const deletePlaylist = useDeletePlaylist();
  const [localPlaylists] = useLocalPlaylists();

  const onDelete = (playlist: Partial<Playlist>) => () => {
    Modal.confirm({
      title: "Delete playlist",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete "${playlist.name}"?`,
      onOk() {
        deletePlaylist(playlist.id);
      }
    });
  };

  return (
    <List
      header={<Text strong>Local playlists: {localPlaylists.length}</Text>}
      bordered
      dataSource={localPlaylists}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button
              danger
              type="text"
              size="small"
              title="Delete playlist"
              icon={<DeleteOutlined />}
              onClick={onDelete(item)}
            />
          ]}
        >
          <Link href={`/playlists/${item.id}`}>{item.id}</Link>{" "}
          <Text>{item.name}</Text>
        </List.Item>
      )}
    />
  );
}
