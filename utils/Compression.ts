import pako from "pako";

export function deflate(data: string): Uint8Array {
  return pako.gzip(data);
}

export function inflate(bytes: Uint8Array): string {
  return pako.ungzip(bytes, { to: "string" });
}

export function deflateInChunks(data: string, maxBytesPerChunk = 1000): Uint8Array[] {
  const bytes = deflate(data);

  const chunksLength = Math.ceil(bytes.byteLength / maxBytesPerChunk);
  const chunks: Array<Uint8Array> = [];

  for (let i = 0; i < chunksLength; i++) {
    const start = i * maxBytesPerChunk;
    const end = start + maxBytesPerChunk;

    chunks.push(bytes.slice(start, end));
  }

  return chunks;
}

export function inflateFromChunks(chunks: Uint8Array[]): string {
  const totalBytesLength = chunks.reduce((sum, chunk) => sum + chunk.byteLength, 0);
  const bytes = new Uint8Array(totalBytesLength);

  let nextSetOffset = 0;
  for (let chunk of chunks) {
    bytes.set(chunk, nextSetOffset);
    nextSetOffset += chunk.byteLength;
  }

  return inflate(bytes);
}
