import { io } from "socket.io-client";
import React from "react";

const SOCKET_URL = "http://lvh.me:7000";

export const socket = io(SOCKET_URL);
export const SocketContext = React.createContext();
