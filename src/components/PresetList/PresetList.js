import Preset from "../Preset/Preset";
import "./PresetList.css";

const PresetList = ({ presets }) => {
  return (
    <div className="preset-list">
      <ul className="preset-list__presets">
        {presets.map((preset) => {
          return (
            <li className="preset-list__item" key={preset._id}>
              <Preset preset={preset} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PresetList;
