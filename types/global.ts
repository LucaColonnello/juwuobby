// courtesy of https://gist.github.com/screeny05/b1b7cbeb81479ece36dae21a9ee17d30
// modified based on updates from https://wicg.github.io/file-system-access

export enum ChooseFileSystemEntriesType {
    'open-file',
    'save-file',
    'open-directory'
}

export enum FileSystemPermissionMode {
  "read",
  "readwrite"
}

export enum FileSystemHandleKind {
  "file",
  "directory"
}

declare global {
  interface ChooseFileSystemEntriesOptionsAccepts {
      description?: string;
      mimeTypes?: string;
      extensions?: string;
  }

  interface ChooseFileSystemEntriesOptions {
      type?: ChooseFileSystemEntriesType;
      multiple?: boolean;
      accepts?: ChooseFileSystemEntriesOptionsAccepts[];
      excludeAcceptAllOption?: boolean;
  }

  interface FileSystemHandlePermissionDescriptor {
    mode?: FileSystemPermissionMode
  }

  interface FileSystemCreateWriterOptions {
      keepExistingData?: boolean;
  }

  interface FileSystemGetFileOptions {
      create?: boolean;
  }

  interface FileSystemGetDirectoryOptions {
      create?: boolean;
  }

  interface FileSystemRemoveOptions {
      recursive?: boolean;
  }

  enum SystemDirectoryType {
      'sandbox'
  }

  interface GetSystemDirectoryOptions {
      type: SystemDirectoryType;
  }

  interface FileSystemWriter {
      write(position: number, data: BufferSource | Blob | string): Promise<void>;
      truncate(size: number): Promise<void>;
      close(): Promise<void>;
  }

  interface FileSystemWriterConstructor {
      new(): FileSystemWriter;
  }

  interface FileSystemHandle {
      kind: Readonly<FileSystemHandleKind>;
      name: Readonly<string>;
      isSameEntry(other: FileSystemHandle): Promise<boolean>;
      queryPermission(descriptor?: FileSystemHandlePermissionDescriptor): Promise<PermissionState>;
      requestPermission(descriptor?: FileSystemHandlePermissionDescriptor): Promise<PermissionState>;
  }

  interface FileSystemHandleConstructor {
      new(): FileSystemHandle;
  }

  interface FileSystemFileHandle extends FileSystemHandle {
      getFile(): Promise<File>;
      createWriter(options?: FileSystemCreateWriterOptions): Promise<FileSystemWriter>;
  }

  interface FileSystemFileHandleConstructor {
      new(): FileSystemFileHandle;
  }

  interface FileSystemDirectoryHandle extends FileSystemHandle {
      getFile(name: string, options?: FileSystemGetFileOptions): Promise<FileSystemFileHandle>;
      getDirectory(name: string, options?: FileSystemGetDirectoryOptions): Promise<FileSystemDirectoryHandle>;
      entries(): AsyncIterable<[string, FileSystemFileHandle | FileSystemDirectoryHandle]>;
      values(): AsyncIterable<FileSystemFileHandle | FileSystemDirectoryHandle>;
      removeEntry(name: string, options?: FileSystemRemoveOptions): Promise<void>;
  }

  interface FileSystemDirectoryHandleConstructor {
      new(): FileSystemDirectoryHandle;
      getSystemDirectory(options: GetSystemDirectoryOptions): Promise<FileSystemDirectoryHandle>;
  }

  interface Window {
      chooseFileSystemEntries(options?: ChooseFileSystemEntriesOptions): Promise<FileSystemHandle | FileSystemHandle[]>;
      showDirectoryPicker(options?: ChooseFileSystemEntriesOptions): Promise<FileSystemDirectoryHandle>;
      FileSystemHandle: FileSystemHandleConstructor;
      FileSystemFileHandle: FileSystemFileHandleConstructor;
      FileSystemDirectoryHandle: FileSystemDirectoryHandleConstructor;
      FileSystemWriter: FileSystemWriterConstructor;
  }
}