import { auth, firebase } from "../../firebase";

import {
  ACCOUNT_ALREADY_EXISTS_WITH_DIFFERENT_CREDENTIALS,
  CANCELLED_POPUP_ERROR,
  CLOSED_POPUP_ERROR,
  INVALID_EMAIL_ERROR,
  PASSWORD_SIGN_IN_METHOD,
} from "./constants";
import {
  AuthProviders,
  getAuthProvider,
  getAuthProviderIdBySignInMethod,
} from "./authProviders";
import { NoEmailProvidedError, UnsuccessfulLoginError } from "./errors";

export interface LoginDelegate {
  askUserToSignInWithDifferentMethod: (provider: AuthProviders) => Promise<boolean>;
}

export default async function login(
  provider: AuthProviders,
  loginDelegate: LoginDelegate,
): Promise<firebase.User> {
  try {
    const result = await auth.signInWithPopup(getAuthProvider(provider));
    return result.user;
  } catch (error) {
    if (
      error.code === CANCELLED_POPUP_ERROR ||
      error.code === CLOSED_POPUP_ERROR
    ) {
      return;
    }

    if (error.code === ACCOUNT_ALREADY_EXISTS_WITH_DIFFERENT_CREDENTIALS) {
      const pendingCredentials = error.credential;

      const email = error.email;
      if (!email) {
        throw new NoEmailProvidedError("No email provided with the user account");
      }

      const usedSignInMethod = await fetchSignInMethodForEmail(email);
      const previouslyUsedAuthProvider = getAuthProviderIdBySignInMethod(usedSignInMethod);

      if (!await loginDelegate.askUserToSignInWithDifferentMethod(previouslyUsedAuthProvider)) {
        return;
      }

      const result = await auth.signInWithPopup(
        getAuthProvider(previouslyUsedAuthProvider)
      );
      await result.user.linkWithCredential(pendingCredentials);
      return result.user;
    }

    throw error;
  }
}

async function fetchSignInMethodForEmail(email) {
  try {
    const usedSignInMethods = await auth.fetchSignInMethodsForEmail(email);
    if (usedSignInMethods[0] === PASSWORD_SIGN_IN_METHOD) {
      throw new UnsuccessfulLoginError("Password is not a recognised sign in method");
    }

    return usedSignInMethods[0];
  } catch (error) {
    if (error.code === INVALID_EMAIL_ERROR) {
      throw new UnsuccessfulLoginError("Invalid email provided");
    }

    throw error;
  }
}
