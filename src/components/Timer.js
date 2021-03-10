import React, { useState, useEffect } from "react";
import api from "../utils/api";

const Timer = () => {
  const [phase, setPhase] = useState("production");
  const [time, setTime] = useState([0, 3, 0]);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);

  const setTimer = (hours, minutes, seconds) => {
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    api
      .stopConveyor()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
    setHours(parseInt(time[0]));
    setMinutes(parseInt(time[1]));
    setSeconds(parseInt(time[2]));
    console.log(e);
  };

  const timeChange = (e) => {
    setTime(e.target.value.split(":"));
  };

  useEffect(() => {
    setPhase("starting");
    setTimer(0, 0, 5);
  }, []);

  useEffect(() => {
    let intervalId;
    intervalId = setInterval(() => {
      if (hours <= 0 && minutes <= 0 && seconds <= 0) {
        clearInterval(intervalId);
        switch (phase) {
          case "starting":
            api
              .checkState()
              .then((data) => {
                setPhase(data.status);
                if (data.status === "running") {
                  return api.runConveyor();
                }
                if (data.status === "production") {
                  return api.stopConveyor();
                }
              })
              .then((data) => {
                if (data.status === "running") {
                  setTimer(0, 0, 5);
                }
                if (data.status === "production") {
                  console.log(time);
                  setTimer(
                    parseInt(time[0]),
                    parseInt(time[1]),
                    parseInt(time[2])
                  );
                }
              })
              .catch((err) => console.log(err));
            break;
          case "production":
            api
              .runConveyor()
              .then((data) => {
                console.log(data);
                setSeconds(5);
                setPhase("running");
              })
              .catch((err) => console.log(err));
            break;
          case "running":
            api
              .stopConveyor()
              .then((data) => {
                console.log(data);
                setHours(parseInt(time[0]));
                setMinutes(parseInt(time[1]));
                setSeconds(parseInt(time[2]));
                setPhase("production");
              })
              .catch((err) => console.log(err));
            break;
          default:
            break;
        }
      }
      if (hours > 0 && minutes <= 0 && seconds <= 0) {
        setHours((hours) => hours - 1);
        setMinutes((minutes) => (minutes = 59));
      }
      if (minutes > 0 && seconds <= 0) {
        setMinutes((minutes) => minutes - 1);
        setSeconds((seconds) => (seconds = 59));
      }
      if (seconds > 0) {
        setSeconds((seconds) => seconds - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [phase, time, hours, minutes, seconds]);

  return (
    <>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="time"
          step="1"
          defaultValue="00:03:00"
          onChange={timeChange}
        ></input>
        <button>Send</button>
      </form>

      <p className="timer">{`${hours}h:${minutes}m:${seconds}s`}</p>
      <p className="timer">{`PHASE: ${phase}`}</p>
    </>
  );
};

export default Timer;
