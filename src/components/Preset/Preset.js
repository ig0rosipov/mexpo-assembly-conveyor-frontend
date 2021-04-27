import "./Preset.css";

const Preset = ({ preset }) => {
  return (
    <div className="preset">
      <p className="preset__name">{preset.name}</p>
      <div className="preset__time-info">
        <div className="preset__time">
          <p className="preset__time-description">Время паузы</p>
          <p className="preset__time-value">{preset.stopTime}</p>
        </div>
        <div className="preset__time">
          <p className="preset__time-description">Время движения</p>
          <p className="preset__time-value">{preset.runTime}</p>
        </div>
      </div>
      <div className="preset__buttons">
        <button className="preset__button">C</button>
        <button className="preset__button">E</button>
        <button className="preset__button">D</button>
      </div>
    </div>
  );
};

export default Preset;
