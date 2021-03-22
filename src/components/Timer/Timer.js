import "./Timer.css";
import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../context/socket";
import api from "../../utils/api";

const Timer = (props) => {
  const [phase, setPhase] = useState("starting");
  const [time, setTime] = useState({
    stopTime: [0, 0, 0],
    runTime: [0, 0, 0],
  });
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timestamp, setTimestamp] = useState("no timestamp yet");

  const socket = useContext(SocketContext);

  const phaseRU = {
    running: "Перемещение",
    production: "Производство",
    starting: "Запуск",
  };

  const handleServerData = (data) => {
    const { currentTime, phase } = data;
    const [hours, minutes, seconds] = currentTime;
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
    setPhase(phase);
    console.log(data);
  };

  const handleContinue = () => {
    socket.emit("timerState", false);
    socket.emit("subscribeToTimer", {
      ...time,
      currentTime: [hours, minutes, seconds],
      phase: phase,
    });
    socket.on("timer", (serverData) => {
      handleServerData(serverData);
    });
  };

  const handlePause = () => {
    socket.emit("timerState", true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    socket.emit("subscribeToTimer", {
      ...time,
      currentTime: [0, 0, 10],
      phase: "starting",
    });
    socket.on("timer", (serverData) => {
      handleServerData(serverData);
    });
  };
  const timeChange = (e) => {
    const name = e.target.name;
    setTime({
      ...time,
      [name]: e.target.value.split(":").map((elem) => parseInt(elem)),
    });
  };

  // useEffect(() => {
  //   socket.on("timer", (serverData) => {
  //     console.log(serverData);
  //     if(serverData) {
  //       handleServerData(serverData)
  //     }
  //   });
  // },[])

  useEffect(() => {
    socket.on((serverData) => {
      handleServerData(serverData);
    });
  }, [socket]);

  return (
    <section class="timer">
      <p className="timer__main">{`${hours}h:${minutes}m:${seconds}s`}</p>
      <p className="timer__phase">{`${phaseRU[phase]}`}</p>
      <div className="timer__controls">
        <form className="timer__form" onSubmit={onSubmit}>
          <label className="timer__label" for="stop-time">
            Время паузы
          </label>
          <input
            className="timer__time-input"
            id="stop-time"
            type="time"
            name="stopTime"
            step="1"
            defaultValue="00:00:00"
            onChange={timeChange}
          ></input>

          <label className="timer__label" for="run-time">
            Время движения
          </label>
          <input
            className="timer__time-input"
            type="time"
            name="runTime"
            id="run-time"
            step="1"
            defaultValue="00:00:00"
            onChange={timeChange}
          ></input>

          <button className="timer__submit-button">Подтвердить</button>
        </form>
        <div className="timer__buttons">
          <button
            className="timer__control-button timer__control-button_type_continue"
            onClick={handleContinue}
          >
            Продолжить
          </button>
          <button
            className="timer__control-button timer__control-button_type_pause"
            onClick={handlePause}
          >
            Пауза
          </button>
        </div>
      </div>
    </section>
  );
};

export default Timer;
