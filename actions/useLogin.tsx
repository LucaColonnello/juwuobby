import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import * as FirebaseAuth from "../utils/FirebaseAuth";

import type { Action } from "../types";

export default function useLogin(): Action<
  (provider: FirebaseAuth.AuthProviders) => Promise<void>
> {
  return async function login(provider) {
    const loginDelegate: FirebaseAuth.LoginDelegate = {
      askUserToSignInWithDifferentMethod(previouslyUsedProvider) {
        return new Promise((resolve) => {
          Modal.confirm({
            title: "You already signed in with a different method",
            icon: <ExclamationCircleOutlined />,
            content: `You already signed in using ${previouslyUsedProvider}. Do you want to use ${previouslyUsedProvider} to sign in?`,
            onOk() {
              resolve(true);
            },
            onCancel() {
              resolve(false);
            },
          });
        });
      }
    };
  
    await FirebaseAuth.login(provider, loginDelegate);
  };
}
