import { Button, Modal } from "antd";
import type { SizeType } from "antd/lib/config-provider/SizeContext";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

import useDeletePlaylist from "../../actions/useDeletePlaylist";
import { Playlist } from "../../types";

interface DeletePlaylistButtonProps {
  size?: "medium" | "small";
  playlist: Partial<Playlist>;
  onDelete: () => void;
}

export default function DeletePlaylistButton({
  size = "small",
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
      size={size as Partial<SizeType>}
      title="Delete playlist"
      icon={<DeleteOutlined />}
      onClick={onDeletePressed}
    />
  );
}
