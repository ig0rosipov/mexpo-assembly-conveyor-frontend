import "./Timer.css";

const Timer = ({
  timer,
  emergencyStatus,
  sensorStatus,
  pad,
  handleContinue,
  handlePause,
  onSubmit,
  handleTimeInput,
  resetAlarm,
  colorizeTimer,
  colorizeMessage,
  isPausePressed,
}) => {
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

      <div className="timer__controls">
        <form className="timer__form" onSubmit={onSubmit}>
          <label className="timer__label" htmlFor="stop-time">
            Время паузы
          </label>
          <input
            className="timer__time-input"
            id="stop-time"
            type="time"
            name="stopTime"
            step="1"
            defaultValue="00:00:00"
            onChange={handleTimeInput}
          ></input>

          <label className="timer__label" htmlFor="run-time">
            Время движения
          </label>
          <input
            className="timer__time-input"
            type="time"
            name="runTime"
            id="run-time"
            step="1"
            defaultValue="00:00:00"
            onChange={handleTimeInput}
          ></input>
            <div className="timer__form-buttons">
          <button
            disabled={emergencyStatus || sensorStatus}
            className={`timer__button timer__button_type_submit ${
              emergencyStatus || sensorStatus ? "timer__button_disabled" : ""
            } `}
          >
            Запустить
          </button>
          <button className="timer__button timer__button_type_save-preset">
            Сохранить
          </button>
            </div>
        </form>
        <div className="timer__buttons">
          <button
            disabled={emergencyStatus || sensorStatus}
            className={`timer__button timer__button_type_continue ${
              emergencyStatus || sensorStatus ? "timer__button_disabled" : ""
            }`}
            onClick={handleContinue}
          >
            Продолжить
          </button>
          <button
            className={`timer__button timer__button_type_pause ${
              isPausePressed ? "timer__button_pressed" : ""
            }`}
            onClick={handlePause}
          >
            Пауза
          </button>
          <button
            className="timer__button timer__button_type_emergency"
            onClick={resetAlarm}
          >
            Сброс аварии
          </button>
        </div>
      </div>
    </section>
  );
};

export default Timer;
