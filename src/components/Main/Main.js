import "./Main.css";
import { useEffect, useState } from "react";
import arduinoApi from "../../utils/arduinoApi";
import Timer from "../Timer/Timer";
import Setter from "../Setter/Setter";
import Controls from "../Controls/Controls";
import PresetList from "../PresetList/PresetList";
import PresetPopup from "../PresetPopup/PresetPopup";
import mainApi from "../../utils/mainApi";
const Main = ({ socket, presets, setPresets }) => {
  const [timerInputs, setTimerInputs] = useState({
    stopTime: "00:00:00",
    runTime: "00:00:00",
  });
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
  const [manualStatus, setManualStatus] = useState(false);
  const [isPausePressed, setIsPausePressed] = useState(false);
  const [isPresetPopupOpened, setIsPresetPopupOpened] = useState(false);

  const handleServerData = (data) => {
    const { currentTime, phase, emergency, sensor, manual } = data;
    setTimer({
      currentTime,
      phase,
    });
    setEmergencyStatus(emergency);
    setSensorStatus(sensor);
    setManualStatus(manual);
  };

  const handleContinue = (setButtonText) => {
    setButtonText("Запуск...");
    if (timer.phase === "running") {
      arduinoApi
        .runConveyor()
        .then((data) => {
          console.log(data);
          setButtonText("Продолжить");
          setIsPausePressed(false);
          setManualStatus(false);
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
          setButtonText("Продолжить");
          setIsPausePressed(false);
          setManualStatus(false);
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
        socket.emit("pauseState", true);
      });
  };

  const setTimeSubmit = (e) => {
    e.preventDefault();
    arduinoApi
      .stopConveyor()
      .then((data) => {
        console.log(data);
        setIsPausePressed(false);
        setManualStatus(false);
      })
      .catch((err) => {
        console.log(err);
      });
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

  const parseTime = (timeString) => {
    const result = timeString.split(":").map((elem) => parseInt(elem));
    if (result.length < 3) {
      result.push(0);
    }

    return result;
  };

  const changeTimeValues = (inputName, array, string) => {
    setTimerSettings({
      ...timerSettings,
      [inputName]: array,
    });

    setTimerInputs({
      ...timerInputs,
      [inputName]: string,
    });
  };

  const handleTimeInput = (e) => {
    console.log(e.target.value);
    const name = e.target.name;
    const val = parseTime(e.target.value);
    changeTimeValues(name, val, e.target.value);
  };

  const onPresetSelect = ({ stopTime, runTime }) => {
    setTimerSettings({
      ...timerSettings,
      stopTime: parseTime(stopTime),
      runTime: parseTime(runTime),
    });

    setTimerInputs({
      ...timerInputs,
      stopTime,
      runTime,
    });
  };

  const onPresetPopupSubmit = (name) => {
    const { runTime, stopTime } = timerInputs;
    console.log(name, runTime, stopTime);
    return mainApi.addPreset({ name, runTime, stopTime });
  };

  const onDeletePreset = (id) => {
    mainApi
      .deletePreset(id)
      .then((data) => {
        setPresets(presets.filter((preset) => preset._id !== data._id));
      })
      .catch((err) => console.log(err));
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

  useEffect(() => {
    if (manualStatus) {
      handlePause();
    }
  }, [manualStatus]);

  return (
    <main className="main">
      <Timer
        emergencyStatus={emergencyStatus}
        sensorStatus={sensorStatus}
        manualStatus={manualStatus}
        timer={timer}
        colorizeTimer={colorizeTimer}
        colorizeMessage={colorizeMessage}
        pad={pad}
        socket={socket}
        handleServerData={handleServerData}
      />

      <div className="main__controller">
        <Setter
          setTimeSubmit={setTimeSubmit}
          handleTimeInput={handleTimeInput}
          emergencyStatus={emergencyStatus}
          sensorStatus={sensorStatus}
          setIsPresetPopupOpened={setIsPresetPopupOpened}
          timerInputs={timerInputs}
        />
        <PresetList
          presets={presets}
          onPresetSelect={onPresetSelect}
          onDeletePreset={onDeletePreset}
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
      <PresetPopup
        isPresetPopupOpened={isPresetPopupOpened}
        setIsPresetPopupOpened={setIsPresetPopupOpened}
        onPresetPopupSubmit={onPresetPopupSubmit}
        setPresets={setPresets}
        presets={presets}
      />
    </main>
  );
};

export default Main;
