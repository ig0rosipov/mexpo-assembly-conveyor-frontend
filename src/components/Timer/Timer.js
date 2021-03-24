import "./Timer.css";

const Timer = ({
  timer,
  pad,
  handleContinue,
  handlePause,
  onSubmit,
  handleTimeInput,
  resetAlarm,
  colorizeTimer,
  colorizeMessage,
}) => {
  const { currentTime, phase } = timer;
  const [hours, minutes, seconds] = currentTime;


  const phaseRU = {
    running: "Перемещение",
    production: "Производство",
    starting: "Запуск",
    emergency: "Нажата аварийная кнопка",
  };

  return (
    <section className="timer">
      <p
        className="timer__main"
        style={colorizeTimer(minutes, seconds)}
      >{`${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`}</p>
      <p
        className="timer__phase"
        style={colorizeMessage(phase)}
      >{`${phaseRU[phase]}`}</p>
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

          <button className="timer__submit-button">Подтвердить</button>
        </form>
        <div className="timer__buttons">
          <button
            disabled={phase === "emergency"}
            className={`timer__control-button timer__control-button_type_continue ${
              phase === "emergency" ? "timer__control-button_disabled" : ""
            }`}
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
          <button
            className="timer__control-button timer__control-button_type_emergency"
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
