import "./Controls.css";
import { useState } from "react";
const Controls = ({
  emergencyStatus,
  sensorStatus,
  handleContinue,
  isPausePressed,
  handlePause,
  resetAlarm,
}) => {
  const [continueButtonText, setContinueButtonText] = useState("Продолжить");

  const onContinue = () => {
    handleContinue(setContinueButtonText);
  };

  return (
    <div className="controls">
      <div className="controls__buttons">
        <button
          disabled={emergencyStatus || sensorStatus}
          className={`controls__button controls__button_type_continue button ${
            emergencyStatus || sensorStatus ? "button_disabled" : ""
          }`}
          onClick={onContinue}
        >
          {continueButtonText}
        </button>
        <button
          className={`controls__button controls__button_type_pause button ${
            isPausePressed ? "button_pressed" : ""
          }`}
          onClick={handlePause}
        >
          Пауза
        </button>
        <button
          className="controls__button controls__button_type_emergency button"
          onClick={resetAlarm}
        >
          Сброс аварии
        </button>
      </div>
    </div>
  );
};

export default Controls;
