import "./Setter.css";
const Setter = ({
  setTimeSubmit,
  handleTimeInput,
  emergencyStatus,
  sensorStatus,
  setIsCreatePresetPopupOpened,
  timerInputs,
}) => {
  const onSaveButton = (e) => {
    e.preventDefault();
    setIsCreatePresetPopupOpened(true);
  };

  return (
    <form className="setter" onSubmit={setTimeSubmit}>
      <label className="setter__label" htmlFor="stop-time">
        Время паузы
      </label>
      <input
        className="setter__time-input"
        id="stop-time"
        type="time"
        name="stopTime"
        step="1"
        onChange={handleTimeInput}
        value={timerInputs.stopTime}
      ></input>

      <label className="setter__label" htmlFor="run-time">
        Время движения
      </label>
      <input
        className="setter__time-input"
        type="time"
        name="runTime"
        id="run-time"
        step="1"
        value={timerInputs.runTime}
        onChange={handleTimeInput}
      ></input>
      <div className="setter__form-buttons">
        <button
          disabled={emergencyStatus || sensorStatus}
          className={`setter__button setter__button_type_submit button ${
            emergencyStatus || sensorStatus ? "button_disabled" : ""
          } `}
        >
          Запустить
        </button>
        <button
          className={`setter__button setter__button_type_save-preset button ${
            (timerInputs.runTime === "00:00:00" ||
              timerInputs.stopTime === "00:00:00") &&
            "button_disabled"
          }`}
          onClick={onSaveButton}
          disabled={
            timerInputs.runTime === "00:00:00" ||
            timerInputs.stopTime === "00:00:00"
          }
        >
          Сохранить
        </button>
      </div>
    </form>
  );
};

export default Setter;
