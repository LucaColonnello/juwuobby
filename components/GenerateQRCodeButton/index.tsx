import { Button, Tooltip } from "antd";
import { QrcodeOutlined } from "@ant-design/icons";

import { useGenerateQRCode } from "../../actions";

import type { Playlist } from "../../types";

export interface GenerateQRCodeButtonProps {
  playlist: Playlist
}

export default function GenerateQRCodeButton({ playlist }: GenerateQRCodeButtonProps) {
  const generateQRCode = useGenerateQRCode();

  const onGenerateQRCodeClick = () => {
    const qrCodeUrl = generateQRCode(playlist);
    window.open(qrCodeUrl, "_blank");
  };

  return (
    <Tooltip title="Generate QR Code">
      <Button
        size="middle"
        type="text"
        icon={<QrcodeOutlined />}
        onClick={onGenerateQRCodeClick}
      />
    </Tooltip>
  );
}