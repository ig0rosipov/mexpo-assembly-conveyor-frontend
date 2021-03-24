import "./App.css";
import Timer from "../Timer/Timer";
import { SocketContext } from "../../context/socket";
import React, { useState, useEffect, useContext } from "react";
import api from "../../utils/api";

const App = () => {
  const socket = useContext(SocketContext);
  const [timerSettings, setTimerSettings] = useState({
    stopTime: [0, 0, 0],
    runTime: [0, 0, 0],
  });
  const [timer, setTimer] = useState({
    currentTime: [0, 0, 0],
    phase: "starting",
  });

  const handleServerData = (data) => {
    const { currentTime, phase } = data;
    const [hours, minutes, seconds] = currentTime;
    setTimer({
      currentTime: [hours, minutes, seconds],
      phase,
    });

  };

  const handleContinue = () => {
    socket.emit("timerState", false);

    socket.emit("changeTimer", {
      ...timerSettings,
      ...timer,
    });
    socket.on("time", (serverData) => {
      handleServerData(serverData);
    });
  };

  const handlePause = () => {
    socket.emit("timerState", true);
  };

  const setTimeSubmit = (e) => {
    e.preventDefault();
    socket.emit("changeTimer", {
      ...timerSettings,
      currentTime: [0, 0, 4],
      phase: "starting",
    });
    socket.on("time", (serverData) => {
      handleServerData(serverData);
    });
  };

  const handleTimeInput = (e) => {
    const name = e.target.name;
    const val = e.target.value.split(":").map((elem) => parseInt(elem));
    if (val.length < 3) {
      val.push(0);
    }
    setTimerSettings({
      ...timerSettings,
      [name]: val,
    });
  };

  const resetAlarm = () => {
    socket.emit("resetAlarm", "test");
  };

  useEffect(() => {
    socket.on("time", (serverData) => {
      console.log(serverData);
      if (serverData) {
        handleServerData(serverData);
      }
    });
  }, []);

  useEffect(() => {
    if (timer.phase === "running") {
      api
        .runConveyor()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (timer.phase === "production") {
      api
        .stopConveyor()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [timer.phase]);

  useEffect(() => {
    socket.on((serverData) => {
      handleServerData(serverData);
    });
  }, [socket]);

  const colors = {
    green: {
      color: "#07de76",
    },
    yellow: {
      color: "#ffa742",
    },
    blue: {
      color: "#2976ec",
    },
    red: {
      color: "#DF324D",
    },
    transparentWhite: {
      color: "rgba(255, 255, 255, .6)",
    },
  };

  const colorizeTimer = (minutes, seconds) => {
    if (minutes <= 0 && seconds <= 5 && seconds >= 3) {
      return colors.yellow;
    }
    if (minutes <= 0 && seconds <= 2) {
      return colors.red;
    }
    if (timer.phase === "production") {
      return colors.green;
    }
    return colors.blue;
  };

  const colorizeMessage = (phase) => {
    if (phase !== "emergency") {
      return colors.transparentWhite;
    }

    return colors.red;
  };

  const pad = (number, size) => {
    number = number.toString();
    while (number.length < size) number = "0" + number;
    return number;
  };

  return (
    <div className="app">
      <Timer
        timer={timer}
        pad={pad}
        handleContinue={handleContinue}
        handlePause={handlePause}
        onSubmit={setTimeSubmit}
        handleTimeInput={handleTimeInput}
        resetAlarm={resetAlarm}
        colorizeTimer={colorizeTimer}
        colorizeMessage={colorizeMessage}
      />
    </div>
  );
};

export default App;
