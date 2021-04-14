const currentIp = "192.168.25.111";

export const config = {
  mainApi: `http://${currentIp}/api`,
  arduinoUrl: "http://192.168.24.186",
  mainAddress: `http://${currentIp}`,
  socketIoPath: '/api/socket.io',
};

export const allowedUrls = [
  "http://lvh.me",
  "http://localhost",
  config.mainAddress,
  config.arduinoUrl,
];
