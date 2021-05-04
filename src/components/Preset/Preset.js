import "./Preset.css";
// import { useState } from "react";

const Preset = ({ preset, onPresetSelect, onDeletePreset }) => {
  const { _id, name, runTime, stopTime } = preset;
  // const [isEditPressed, setIsEditPressed] = useState(false);

  const onSelectButton = () => {
    onPresetSelect({
      stopTime,
      runTime,
    });
  };

  const onDelete = () => {
    onDeletePreset(_id);
  };

  // const onEditClick = () => {
  //   setIsEditPressed(true);
  // };

  // const onEditSubmit = (e) => {
  //   e.preventDefault();
  //   setIsEditPressed(false);
  // };

  return (
    <div className="preset">
      <p className={`preset__name`}>{name}</p>
      {/* <form
        id="edit-name"
        className={`preset__edit-form ${!isEditPressed && "hidden"}`}
        onSubmit={onEditSubmit}
      >
        <input className="preset__edit-input" value={name} />
      </form> */}
      <div className="preset__time-info">
        <div className="preset__time">
          <p className="preset__time-description">Пауза</p>
          <p className="preset__time-value">{stopTime}</p>
        </div>
        <div className="preset__time">
          <p className="preset__time-description">Движение</p>
          <p className="preset__time-value">{runTime}</p>
        </div>
      </div>
      <div className="preset__buttons">
        <button
          className="preset__button preset__button_type_select"
          onClick={onSelectButton}
        ></button>
        {/* <button
          className={`preset__button ${isEditPressed && "hidden"}`}
          onClick={onEditClick}
        >
          E
        </button>
        <button
          className={`preset__button ${!isEditPressed && "hidden"}`}
          form="edit-name"
        >
          K
        </button> */}
        <button
          className="preset__button preset__button_type_delete"
          onClick={onDelete}
        ></button>
      </div>
    </div>
  );
};

export default Preset;
