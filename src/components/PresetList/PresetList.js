import Preset from "../Preset/Preset";
import "./PresetList.css";

const PresetList = ({ presets, onPresetSelect, onDeletePreset, closeAllPopups }) => {
  return (
    <div className="preset-list">
      <button onClick={closeAllPopups} className="preset-list__close-button close-button"></button>
      <div className={`preset-list__wrapper ${presets.length > 9 && "preset-list__wrapper_type_scroll"}`}>
        <ul className="preset-list__presets">
          {presets.map((preset) => {
            return (
              <li className="preset-list__item" key={preset._id}>
                <Preset
                  preset={preset}
                  onPresetSelect={onPresetSelect}
                  onDeletePreset={onDeletePreset}
                  closeAllPopups={closeAllPopups}
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
