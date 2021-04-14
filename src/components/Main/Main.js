import "./Main.css";
import { useEffect, useState } from "react";
import arduinoApi from "../../utils/arduinoApi";
import Timer from "../Timer/Timer";
import Setter from "../Setter/Setter";
import Controls from "../Controls/Controls";

const Main = ({ socket }) => {
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
      arduinoApi
        .runConveyor()
        .then((data) => {
          console.log(data);
          socket.emit("timerState", false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      arduinoApi
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
    arduinoApi
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
    if (timer.phase === "running") {
      arduinoApi
        .runConveyor()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (timer.phase === "production") {
      arduinoApi
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
    <main className="main">
      <Timer
        emergencyStatus={emergencyStatus}
        sensorStatus={sensorStatus}
        timer={timer}
        colorizeTimer={colorizeTimer}
        colorizeMessage={colorizeMessage}
        pad={pad}
        socket={socket}
        setEmergencyStatus={setEmergencyStatus}
        handleServerData={handleServerData}
      />

      <div className="main__controller">
        <Setter
          setTimeSubmit={setTimeSubmit}
          handleTimeInput={handleTimeInput}
          emergencyStatus={emergencyStatus}
          sensorStatus={sensorStatus}
        />
        <Controls
          emergencyStatus={emergencyStatus}
          sensorStatus={sensorStatus}
          handleContinue={handleContinue}
          isPausePressed={isPausePressed}
          handlePause={handlePause}
          resetAlarm={resetAlarm}
        />
      </div>
    </main>
  );
};

export default Main;