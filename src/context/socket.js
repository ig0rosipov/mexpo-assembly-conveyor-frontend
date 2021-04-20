import { io } from "socket.io-client";
import { config } from "../configs/config";
import React from "react";

const SOCKET_URL = config.mainAddress;

export const socket = io(SOCKET_URL, { path: config.socketIoPath, transports: ['websocket', 'flashsocket', 'xhr-polling'] });
export const SocketContext = React.createContext();
