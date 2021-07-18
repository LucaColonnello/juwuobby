import { FileSystemHandleKind } from "../../types/global";

export default function validateFileHandleByName(
  handle: FileSystemDirectoryHandle | FileSystemFileHandle
) {
  const supportedHTMLAAudioFormat = /\.(mp3|mp4|aac|m4a|flac|webm|wav)$/;

  if (
    handle.kind === FileSystemHandleKind.file &&
    !handle.name.match(supportedHTMLAAudioFormat)
  ) {
    return false;
  }

  return true;
}
