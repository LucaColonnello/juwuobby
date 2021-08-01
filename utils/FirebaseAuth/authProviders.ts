import { firebase } from "../../firebase";

import { UnrecognisedAuthProviderError } from "./errors";

export enum AuthProviders {
  Google = "Google",
  Facebook = "Facebook",
}

enum AuthProvidersBySignInMethods {
  "google.com" = AuthProviders.Google,
  "facebook.com" = AuthProviders.Facebook,
}

const authProviders: Record<AuthProviders, firebase.auth.AuthProvider> = {
  [AuthProviders.Google]: new firebase.auth.GoogleAuthProvider(),
  [AuthProviders.Facebook]: new firebase.auth.FacebookAuthProvider(),
};

export function getAuthProvider(provider: AuthProviders): firebase.auth.AuthProvider {
  if (typeof authProviders[provider] === "undefined") {
    throw new UnrecognisedAuthProviderError(`"${provider}" is not a valid auth provider`);
  }

  return authProviders[provider];
}

export function getAuthProviderIdBySignInMethod(provider: string): AuthProviders {
  const normalisedProvider = provider.toLowerCase();

  if (typeof AuthProvidersBySignInMethods[normalisedProvider] === "undefined") {
    throw new UnrecognisedAuthProviderError(`"${provider}" is not a valid auth provider`);
  }

  return AuthProvidersBySignInMethods[normalisedProvider];
}
