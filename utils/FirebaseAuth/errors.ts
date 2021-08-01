export class NoEmailProvidedError extends Error {
  constructor(message) {
    super(message);
    
    this.name = "NoEmailProvidedError";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NoEmailProvidedError);
    }
  }
}

export class UnsuccessfulLoginError extends Error {
  constructor(message) {
    super(message);
    
    this.name = "UnsuccessfulLoginError";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnsuccessfulLoginError);
    }
  }
}

export class UnrecognisedAuthProviderError extends Error {
  constructor(message) {
    super(message);
    
    this.name = "UnrecognisedAuthProviderError";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnrecognisedAuthProviderError);
    }
  }
}
