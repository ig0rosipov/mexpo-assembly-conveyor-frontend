const currentIp = "192.168.25.158";

export const config = {
  mainApi: `http://${currentIp}/api`,
  arduinoUrl: "http://192.168.24.100",
  mainAddress: `http://${currentIp}`,
  socketIoPath: "/api/socket.io",
};

export const allowedUrls = [
  "http://lvh.me",
  "http://localhost",
  config.mainAddress,
  config.arduinoUrl,
];
