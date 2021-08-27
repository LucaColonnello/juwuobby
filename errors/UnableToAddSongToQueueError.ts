class UnableToAddSongToQueueError extends Error {
  constructor(message) {
    super(message);

    this.name = "UnableToAddSongToQueueError";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnableToAddSongToQueueError);
    }
  }
}

export default UnableToAddSongToQueueError;
