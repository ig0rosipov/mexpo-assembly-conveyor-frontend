import "./Preset.css";

const Preset = ({ preset, onPresetSelect, onDeletePreset, closeAllPopups }) => {
  const { _id, name, runTime, stopTime } = preset;

  const onSelectButton = () => {
    onPresetSelect({
      stopTime,
      runTime,
    });
    closeAllPopups();
  };

  const onDelete = () => {
    onDeletePreset(_id);
  };

  return (
    <div className="preset">
      <p className={`preset__name`}>{name}</p>
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
        <button className="preset__button button" onClick={onSelectButton}>
          Выбрать
        </button>
        <button className="preset__button button" onClick={onDelete}>
          Удалить
        </button>
      </div>
    </div>
  );
};

export default Preset;
