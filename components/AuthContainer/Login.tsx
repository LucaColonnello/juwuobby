import { Button, notification, Typography } from "antd";
import {
  GoogleCircleFilled,
  FacebookFilled,
  UserOutlined,
} from "@ant-design/icons";

import * as FirebaseAuth from "../../utils/FirebaseAuth";
import { useLogin, useLoginAsGuest } from "../../actions";

const { Title } = Typography;

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
      <div className="LoginContainer">
        <div className="LoginHeader">
          <Title level={3}>⏯ Welcome to Juwuobby</Title>
        </div>

        <div className="LoginWithSocials">
          <Button
            type="primary"
            size="large"
            shape="round"
            block
            icon={<GoogleCircleFilled />}
            onClick={makeOnLoginClick(FirebaseAuth.AuthProviders.Google)}
          >
            Login with Google
          </Button>
          <Button
            type="primary"
            size="large"
            shape="round"
            block
            icon={<FacebookFilled />}
            onClick={makeOnLoginClick(FirebaseAuth.AuthProviders.Facebook)}
          >
            Login with Facebook
          </Button>
        </div>
        <div className="LoginAsGuest">
          <span>Or</span>
          <Button
            size="large"
            shape="round"
            block
            icon={<UserOutlined />}
            onClick={makeOnLoginClick()}
          >
            Continue as Guest
          </Button>
        </div>
      </div>
      <style jsx>{`
        .LoginContainer {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          transform: translateY(calc(-95px / 2));
          height: 100vh;
        }
        
        .LoginHeader {
          margin-bottom: 50px;
        }

        .LoginWithSocials {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }

        .LoginAsGuest {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }
      `}</style>
    </>
  );
}
