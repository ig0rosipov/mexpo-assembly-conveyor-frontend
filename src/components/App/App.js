import "./App.css";
import Main from "../Main/Main";
import { SocketContext } from "../../context/socket";
import React, { useContext } from "react";

const App = () => {
  const socket = useContext(SocketContext);
  return (
    <div className="app">
      <Main socket={socket} />
    </div>
  );
};

export default App;
