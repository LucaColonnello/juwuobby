import { Typography } from "antd";
import CreatePlaylistModal from "../components/CreatePlaylistModal";
import LocalPlaylistsList from "../components/LocalPlaylistsList";

const { Title } = Typography;

export default function IndexPage() {
  return (
    <div className="IndexPage">
      <Title level={2}>⏯ Welcome to Juwuobby</Title>
      <CreatePlaylistModal />

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
