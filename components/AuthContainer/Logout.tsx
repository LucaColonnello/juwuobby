import { Button, notification } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import { useLogout } from "../../actions";

export default function Logout() {
  const logout = useLogout();
  
  const onLogoutClick = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
      notification.error({
        key: "logout_error",
        message: "Oh snap!",
        description:
          "There was an error while logging you out. Please contact the monkey developer 🐒 .",
        duration: 5
      });
    }
  };

  return (
    <Button
      icon={<LogoutOutlined />}
      onClick={onLogoutClick}
    >
      Logout
    </Button>
  );
}
