import { Button, Typography, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import withAuthContainer from "../components/AuthContainer";
import Logout from "../components/AuthContainer/Logout";
import CreatePlaylistModal from "../components/CreatePlaylistModal";
import LocalPlaylistsList from "../components/LocalPlaylistsList";

import useLoggedInUser from "../state/loggedInUser";
import canCreateNewPlaylist from "../domain/services/canCreateNewPlaylist";

const { Title } = Typography;

export function IndexPage() {
  const [loggedInUser] = useLoggedInUser();

  return (
    <div className="IndexPage">
      <Title level={2}>⏯ Welcome to Juwuobby</Title>
      <Logout /><br />
      {loggedInUser && canCreateNewPlaylist(loggedInUser) ? (
        <CreatePlaylistModal />
      ) : (
        <Tooltip title="Sign in using Google or Facebook to create new playlist">
          <Button
            type="primary"
            shape="round"
            disabled
            icon={<PlusOutlined />}
          >
            Create new playlist
          </Button>
        </Tooltip>
      )}

      <section className="LocalPlaylistsListContainer">
        <LocalPlaylistsList />
      </section>

      <style jsx>{`
        .IndexPage {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .LocalPlaylistsListContainer {
          margin-top: 16px;
          width: 60vw;
        }
      `}</style>
    </div>
  );
}

export default withAuthContainer(IndexPage);
