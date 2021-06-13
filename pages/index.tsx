import { Typography } from "antd";
import CreatePlaylistModal from "../components/CreatePlaylistModal";
import LocalPlaylistList from "../components/LocalPlaylistList";

const { Title } = Typography;

export default function IndexPage() {
  return (
    <div className="IndexPage">
      <Title level={2}>⏯ Welcome to Juwuobby</Title>
      <CreatePlaylistModal />

      <LocalPlaylistList />

      <style jsx>{`
        .IndexPage {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
      `}</style>
    </div>
  );
}
