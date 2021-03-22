import { io } from "socket.io-client";
import React from "react";

const SOCKET_URL = "http://bel11.modern.org:5000";

export const socket = io(SOCKET_URL);
export const SocketContext = React.createContext();
