import "./App.css";
import Timer from "../Timer/Timer";
import { SocketContext, socket } from "../../context/socket";
import React from "react";

const App = () => {
  return (
    <SocketContext.Provider value={socket}>
      <div className="app">
        <Timer />
      </div>
    </SocketContext.Provider>
  );
};

export default App;
