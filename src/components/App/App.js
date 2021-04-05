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
  const [emergencyStatus, setEmergencyStatus] = useState(false);
  const [sensorStatus, setSensorStatus] = useState(false);
  const [isPausePressed, setIsPausePressed] = useState(false);

  const handleServerData = (data) => {
    const { currentTime, phase, emergency, sensor } = data;
    const [hours, minutes, seconds] = currentTime;
    setTimer({
      currentTime: [hours, minutes, seconds],
      phase,
    });
    setEmergencyStatus(emergency);
    setSensorStatus(sensor);
  };

  const handleContinue = () => {
    setIsPausePressed(false);
    if (timer.phase === "running") {
      api
        .runConveyor()
        .then((data) => {
          console.log(data);
          socket.emit("timerState", false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .stopConveyor()
        .then((data) => {
          console.log(data);
          socket.emit("timerState", false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handlePause = () => {
    setIsPausePressed(true);
    api
      .stopConveyor()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        socket.emit("timerState", true);
      });
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
    setIsPausePressed(false);
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
    setEmergencyStatus(false);
    setSensorStatus(false);
    setIsPausePressed(true);
    socket.emit("resetAlarm", "test");
  };

  useEffect(() => {
    socket.on("time", (serverData) => {
      if (serverData) {
        handleServerData(serverData);
      }
    });
    socket.on("alarm", (status) => {
      setEmergencyStatus(status);
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
    flame: {
      color: "#DF4E22",
    },
    transparentWhite: {
      color: "rgba(255, 255, 255, .6)",
    },
  };

  const colorizeTimer = (minutes, seconds) => {
    if (isPausePressed) {
      return colors.yellow;
    }
    if (emergencyStatus) {
      return colors.red;
    }
    if (timer.phase === "production") {
      return colors.green;
    }
    return colors.blue;
  };

  const colorizeMessage = (phase) => {
    if (!emergencyStatus && !sensorStatus) {
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
        emergencyStatus={emergencyStatus}
        sensorStatus={sensorStatus}
        pad={pad}
        handleContinue={handleContinue}
        handlePause={handlePause}
        onSubmit={setTimeSubmit}
        handleTimeInput={handleTimeInput}
        resetAlarm={resetAlarm}
        colorizeTimer={colorizeTimer}
        colorizeMessage={colorizeMessage}
        isPausePressed={isPausePressed}
        setIsPausePressed={setIsPausePressed}
      />
    </div>
  );
};

export default App;
