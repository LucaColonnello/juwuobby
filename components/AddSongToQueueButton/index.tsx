import { memo, MouseEventHandler, useState } from "react";
import { Button, ButtonProps } from "antd";
import {
  PlusCircleOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

import { useAddSongToPlaylistQueue } from "../../actions";

import type { Song } from "../../types";

export interface AddSongToQueueButtonProps {
  song: Song
}

enum AddSongToQueueStates {
  idle = "idle",
  adding = "adding",
  done = "done",
  error = "error",
}

const buttonPropsByAddSongToQueueStates: Record<
  AddSongToQueueStates,
  Partial<ButtonProps>
> = {
  [AddSongToQueueStates.idle]: {
    icon: <PlusCircleOutlined />,
  },
  [AddSongToQueueStates.adding]: {
    loading: true,
    icon: <LoadingOutlined />,
  },
  [AddSongToQueueStates.done]: {
    icon: <CheckCircleOutlined />,
  },
  [AddSongToQueueStates.error]: {
    danger: true,
    icon: <CloseCircleOutlined />,
  },
};

function AddSongToQueueButton({ song }: AddSongToQueueButtonProps) {
  const [addSongToQueueState, setAddSongToQueueState] =
    useState<AddSongToQueueStates>(AddSongToQueueStates.idle);
  const addSongToPlaylistQueue = useAddSongToPlaylistQueue();
  
  const onAddToQueueClick: MouseEventHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setAddSongToQueueState(AddSongToQueueStates.adding);

      await addSongToPlaylistQueue(song);

      setAddSongToQueueState(AddSongToQueueStates.done);
    } catch (error) {
      console.error(error);
      setAddSongToQueueState(AddSongToQueueStates.error);
    } finally {
      setTimeout(() => {
        setAddSongToQueueState(AddSongToQueueStates.idle);
      }, 1500);
    }
  };

  return (
    <Button
      type="text"
      onClick={onAddToQueueClick}
      {...buttonPropsByAddSongToQueueStates[addSongToQueueState]}
    >
      Add to queue
    </Button>
  );
}

export default memo(AddSongToQueueButton);
