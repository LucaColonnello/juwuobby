import { Button, Modal } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

import useDeletePlaylist from "../../actions/useDeletePlaylist";
import { Playlist } from "../../types";

interface DeletePlaylistButtonProps {
  playlist: Partial<Playlist>;
  onDelete: () => void;
}

export default function DeletePlaylistButton({
  playlist,
  onDelete
}: DeletePlaylistButtonProps) {
  const deletePlaylist = useDeletePlaylist();

  const onDeletePressed = () => {
    Modal.confirm({
      title: "Delete playlist",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete "${playlist.name}"?`,
      onOk() {
        deletePlaylist(playlist.id);
        onDelete();
      }
    });
  };

  return (
    <Button
      danger
      type="text"
      size="small"
      title="Delete playlist"
      icon={<DeleteOutlined />}
      onClick={onDeletePressed}
    />
  );
}
