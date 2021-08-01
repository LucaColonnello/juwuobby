import { Button, notification } from "antd";

import * as FirebaseAuth from "../../utils/FirebaseAuth";
import { useLogin, useLoginAsGuest } from "../../actions";

export default function Login() {
  const login = useLogin();
  const loginAsGuest = useLoginAsGuest();

  const makeOnLoginClick = (
    provider?: FirebaseAuth.AuthProviders,
  ) => async () => {
    try {
      if (provider) {
        await login(provider);
      } else {
        await loginAsGuest();
      }
    } catch (error) {
      console.error(error);
      notification.error({
        key: "login_error",
        message: "Oh snap!",
        description:
          "There was an error while signing you in. Please contact the monkey developer 🐒 .",
        duration: 5
      });
    }
  };

  return (
    <>
      <Button onClick={makeOnLoginClick(FirebaseAuth.AuthProviders.Google)}>Login with Google</Button>
      <Button onClick={makeOnLoginClick(FirebaseAuth.AuthProviders.Facebook)}>Login with Facebook</Button>
      <Button onClick={makeOnLoginClick()}>Login as Guest</Button>
    </>
  );
}
