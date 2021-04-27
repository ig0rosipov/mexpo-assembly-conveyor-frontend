const currentIp = "192.168.25.88";

export const config = {
  mainApi: `http://localhost:7000/api`,
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
