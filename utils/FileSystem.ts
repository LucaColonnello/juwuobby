// courtesy of https://github.com/GoogleChromeLabs/browser-fs-access
import {
  ChooseFileSystemEntriesType,
  FileSystemHandleKind,
  FileSystemPermissionMode
} from '../types/global';

type FileSystemHandleFilter = (handle: FileSystemDirectoryHandle | FileSystemFileHandle) => boolean;

export async function getFilesFromDirectory(
  dirHandle: FileSystemDirectoryHandle,
  recursive: boolean,
  filter: FileSystemHandleFilter = () => true,
  path = dirHandle.name,
): Promise<EnhancedFile[]> {
  const dirs = [];
  const files = [];
  for await (const entry of dirHandle.values()) {
    const nestedPath = `${path}/${entry.name}`;
    if (!filter(entry)) {
      continue;
    }

    if (entry.kind === FileSystemHandleKind.file) {
      files.push(
        (entry as FileSystemFileHandle)
          .getFile()
          .then((file: EnhancedFile) => {
            file.directoryHandle = dirHandle;
            return Object.defineProperty(file, "webkitRelativePath", {
              configurable: true,
              enumerable: true,
              get: () => nestedPath
            });
          })
      );
    } else if (entry.kind === FileSystemHandleKind.directory && recursive) {
      dirs.push(
        getFilesFromDirectory(entry as FileSystemDirectoryHandle, recursive, filter, nestedPath)
      );
    }
  }
  return [...(await Promise.all(dirs)).flat(), ...(await Promise.all(files))];
};

export async function verifyPermission(
  fileHandle: FileSystemDirectoryHandle,
  readWrite: boolean
): Promise<boolean> {
  const options: FileSystemHandlePermissionDescriptor = {};
  if (readWrite) {
    options.mode = FileSystemPermissionMode.readwrite;
  }
  // Check if permission was already granted. If so, return true.
  if ((await fileHandle.queryPermission(options)) === "granted") {
    return true;
  }
  // Request permission. If the user grants permission, return true.
  if ((await fileHandle.requestPermission(options)) === "granted") {
    return true;
  }
  // The user didn't grant permission, so return false.
  return false;
}

export async function pickDirectory(): Promise<FileSystemDirectoryHandle> {
  return await window.showDirectoryPicker({
    type: ChooseFileSystemEntriesType["open-directory"]
  });
}
