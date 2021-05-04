import { build } from "../BUILD_CONFIG";

const currentIp = build === "develop" ? "localhost:7000" : "192.168.64.3";

export const config = {
  mainApi: `http://${currentIp}/api`,
  arduinoUrl: "http://192.168.64.254",
  mainAddress: `http://${currentIp}`,
  socketIoPath: "/api/socket.io",
};

export const allowedUrls = [
  "http://lvh.me",
  "http://localhost",
  config.mainAddress,
  config.arduinoUrl,
];
