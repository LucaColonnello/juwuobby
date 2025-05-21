// domain/entities/__tests__/playlistSongs.test.ts
import { createPlaylistSongsFromDirAndFiles } from '../playlistSongs';
import { PlaylistID, Song, EnhancedFile } from '../../../types'; // Adjust path as needed
import shorthash2 from 'shorthash2';

// Mock FileSystemDirectoryHandle
const mockDirHandle = { name: 'root_dir' } as FileSystemDirectoryHandle;

// Helper to create mock EnhancedFile
// Based on the usage in createPlaylistSongsFromDirAndFiles,
// EnhancedFile needs name and webkitRelativePath.
// It seems to be a File object, so other properties might exist but are not used by the tested function.
const createMockFile = (name: string, webkitRelativePath: string): EnhancedFile => ({
  name,
  webkitRelativePath,
  // Mock other File properties if they were accessed by the function.
  // For current tests, these are enough.
  size: 0,
  type: '', // The 'type' property of File, not our custom Song.type
  lastModified: 0,
  arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
  slice: () => new Blob(),
  stream: () => new ReadableStream(),
  text: () => Promise.resolve(''),
} as unknown as EnhancedFile); // Using unknown for simplicity as File type is complex

describe('createPlaylistSongsFromDirAndFiles', () => {
  const playlistId = 'test-playlist' as PlaylistID;

  it('should correctly type audio files and handle case insensitivity', () => {
    const files: EnhancedFile[] = [
      createMockFile('song1.mp3', 'music/song1.mp3'),
      createMockFile('song2.WAV', 'music/song2.WAV'),
      createMockFile('song3.m4a', 'music/song3.m4a'),
      createMockFile('song4.AAC', 'music/song4.AAC'),
      createMockFile('song5.flac', 'audio/song5.flac'),
      createMockFile('song6.OGG', 'audio/song6.OGG'),
    ];
    const playlistSongs = createPlaylistSongsFromDirAndFiles(playlistId, mockDirHandle, files);
    files.forEach(file => {
      const songHash = shorthash2(file.webkitRelativePath);
      const song = playlistSongs.songsByHash.get(songHash);
      expect(song).toBeDefined();
      expect(song?.type).toBe('audio');
      expect(song?.name).toBe(file.name);
    });
  });

  it('should correctly type video files and handle case insensitivity', () => {
    const files: EnhancedFile[] = [
      createMockFile('video1.mp4', 'videos/video1.mp4'),
      createMockFile('movie.MOV', 'videos/movie.MOV'),
      createMockFile('clip.webm', 'clips/clip.webm'),
      createMockFile('short.AVI', 'shorts/short.AVI'),
      createMockFile('film.mkv', 'films/film.mkv'),
      createMockFile('stream.FLV', 'streams/stream.FLV'),
    ];
    const playlistSongs = createPlaylistSongsFromDirAndFiles(playlistId, mockDirHandle, files);
    files.forEach(file => {
      const songHash = shorthash2(file.webkitRelativePath);
      const song = playlistSongs.songsByHash.get(songHash);
      expect(song).toBeDefined();
      expect(song?.type).toBe('video');
      expect(song?.name).toBe(file.name);
    });
  });

  it('should default to "audio" for unknown extensions', () => {
    const files: EnhancedFile[] = [
      createMockFile('document.unknown', 'docs/document.unknown'),
      createMockFile('archive.zip', 'archives/archive.zip'),
    ];
    const playlistSongs = createPlaylistSongsFromDirAndFiles(playlistId, mockDirHandle, files);
    
    const unknownSongHash = shorthash2(files[0].webkitRelativePath);
    const unknownSong = playlistSongs.songsByHash.get(unknownSongHash);
    expect(unknownSong).toBeDefined();
    expect(unknownSong?.type).toBe('audio');
    expect(unknownSong?.name).toBe(files[0].name);

    const zipSongHash = shorthash2(files[1].webkitRelativePath);
    const zipSong = playlistSongs.songsByHash.get(zipSongHash);
    expect(zipSong).toBeDefined();
    expect(zipSong?.type).toBe('audio'); // Defaulting to audio
    expect(zipSong?.name).toBe(files[1].name);
  });

  it('should throw an error if files array is empty', () => {
    const files: EnhancedFile[] = [];
    expect(() => createPlaylistSongsFromDirAndFiles(playlistId, mockDirHandle, files))
      .toThrow("PlaylistSongs cannot be created, empty list of files");
  });

  it('should correctly create parent directories and assign songs', () => {
    const files: EnhancedFile[] = [
      createMockFile('song1.mp3', 'music/pop/song1.mp3'),
      createMockFile('song2.mp4', 'music/pop/song2.mp4'),
      createMockFile('song3.wav', 'music/rock/song3.wav'),
      createMockFile('song4.mkv', 'videos/action/song4.mkv'),
    ];
    const playlistSongs = createPlaylistSongsFromDirAndFiles(playlistId, mockDirHandle, files);

    // Check root structure
    expect(playlistSongs.root.name).toBe(mockDirHandle.name);
    expect(playlistSongs.root.dirs.length).toBeGreaterThanOrEqual(2); // music, videos

    // Check 'music' directory
    const musicDir = playlistSongs.root.dirs.find(d => d.name === 'music');
    expect(musicDir).toBeDefined();
    expect(musicDir?.dirs.length).toBeGreaterThanOrEqual(2); // pop, rock
    
    // Check 'music/pop' directory
    const popDir = musicDir?.dirs.find(d => d.name === 'pop');
    expect(popDir).toBeDefined();
    expect(popDir?.songs.length).toBe(2);
    const popSong1Hash = shorthash2('music/pop/song1.mp3');
    const popSong2Hash = shorthash2('music/pop/song2.mp4');
    expect(popDir?.songs).toContain(popSong1Hash);
    expect(popDir?.songs).toContain(popSong2Hash);
    expect(playlistSongs.songsByHash.get(popSong1Hash)?.type).toBe('audio');
    expect(playlistSongs.songsByHash.get(popSong2Hash)?.type).toBe('video');

    // Check 'music/rock' directory
    const rockDir = musicDir?.dirs.find(d => d.name === 'rock');
    expect(rockDir).toBeDefined();
    expect(rockDir?.songs.length).toBe(1);
    const rockSong3Hash = shorthash2('music/rock/song3.wav');
    expect(rockDir?.songs).toContain(rockSong3Hash);
    expect(playlistSongs.songsByHash.get(rockSong3Hash)?.type).toBe('audio');

    // Check 'videos' directory
    const videosDir = playlistSongs.root.dirs.find(d => d.name === 'videos');
    expect(videosDir).toBeDefined();
    expect(videosDir?.dirs.length).toBeGreaterThanOrEqual(1); // action

    // Check 'videos/action' directory
    const actionDir = videosDir?.dirs.find(d => d.name === 'action');
    expect(actionDir).toBeDefined();
    expect(actionDir?.songs.length).toBe(1);
    const actionSong4Hash = shorthash2('videos/action/song4.mkv');
    expect(actionDir?.songs).toContain(actionSong4Hash);
    expect(playlistSongs.songsByHash.get(actionSong4Hash)?.type).toBe('video');
  });
});
