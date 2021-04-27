const currentIp = "192.168.64.3";

export const config = {
  mainApi: `http://localhost:7000/api`,
  arduinoUrl: "http://192.168.64.254",
  mainAddress: `http://localhost:7000`,
  socketIoPath: "/api/socket.io",
};

export const allowedUrls = [
  "http://lvh.me",
  "http://localhost",
  config.mainAddress,
  config.arduinoUrl,
];
