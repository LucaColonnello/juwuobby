import querystring from "querystring";

import type { Action, Playlist } from "../types";

// https://www.qrcode-monkey.com
const QRCODE_MONKEY_CONFIG = {"body":"circle-zebra","eye":"frame6","eyeBall":"ball2","erf1":["fv"],"erf2":[],"erf3":[],"brf1":["fv"],"brf2":[],"brf3":[],"bodyColor":"#152F54","bgColor":"#FFFFFF","eye1Color":"#0B1E37","eye2Color":"#0B1E37","eye3Color":"#0B1E37","eyeBall1Color":"#214D8C","eyeBall2Color":"#214D8C","eyeBall3Color":"#214D8C","gradientColor1":null,"gradientColor2":null,"gradientType":"linear","gradientOnEyes":false,"logo":"","logoMode":"default"};

export default function useGenerateQRCode(): Action<
  (playlist: Playlist) => string
> {
  return function generateQRCode(playlist) {
    const { id } = playlist;

    const linkTo = `https://juwuobby.vercel.app/playlists/${id}/public`;
    const qrCodeMonkeyUrl = `https://api.qrcode-monkey.com/qr/custom`;
    const qrCodeMoneySettings = {
      data: linkTo,
      config: JSON.stringify(QRCODE_MONKEY_CONFIG),
      size: 500,
      file: "svg",
    };

    return `${qrCodeMonkeyUrl}?${querystring.stringify(qrCodeMoneySettings)}`;
  };
}
