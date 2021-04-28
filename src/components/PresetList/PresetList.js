import Preset from "../Preset/Preset";
import "./PresetList.css";

const PresetList = ({ presets, onPresetSelect, onDeletePreset }) => {
  return (
    <div className="preset-list">
      <div className="preset-list__wrapper">
        <ul className="preset-list__presets">
          {presets.map((preset) => {
            return (
              <li className="preset-list__item" key={preset._id}>
                <Preset
                  preset={preset}
                  onPresetSelect={onPresetSelect}
                  onDeletePreset={onDeletePreset}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PresetList;
