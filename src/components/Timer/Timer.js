import "./Timer.css";
import { useEffect } from "react";

const Timer = ({
  emergencyStatus,
  sensorStatus,
  timer,
  colorizeTimer,
  colorizeMessage,
  pad,
  socket,
  setEmergencyStatus,
  handleServerData,
}) => {
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

  const { currentTime, phase } = timer;
  const [hours, minutes, seconds] = currentTime;

  const phaseRU = {
    running: "Перемещение",
    production: "Производство",
    starting: "Запуск",
    emergency: "Нажата аварийная кнопка",
    sensor: "Сработал аварийный датчик",
  };

  return (
    <section className="timer">
      <div
        className={`timer__content ${
          (emergencyStatus || sensorStatus) && "timer__content_type_error"
        }`}
      >
        <p
          className={`timer__main ${
            (emergencyStatus || sensorStatus) && "timer__main_type_error"
          }`}
          style={colorizeTimer(minutes, seconds)}
        >{`${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`}</p>
        <p
          className={`timer__phase ${
            (emergencyStatus || sensorStatus) && "timer__phase_type_error"
          }`}
          style={colorizeMessage(phase)}
        >
          {emergencyStatus
            ? phaseRU.emergency
            : sensorStatus
            ? phaseRU.sensor
            : `${phaseRU[phase]}`}
        </p>
      </div>
    </section>
  );
};

export default Timer;
