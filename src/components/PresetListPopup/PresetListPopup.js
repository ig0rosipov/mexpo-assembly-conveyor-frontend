import PresetList from "../PresetList/PresetList";
import "./PresetListPopup.css";

const PresetListPopup = ({
  isPresetsPopupOpened,
  closeAllPopups,
  presets,
  onPresetSelect,
  onDeletePreset,
}) => {
  const onOverlayClick = (e) => {
    if(e.target !== e.currentTarget) {
      return;
    }
    closeAllPopups();
  }

  return (
    <section className={`presets-popup popup ${!isPresetsPopupOpened && "popup_hidden"}`}
    onClick={onOverlayClick}>
      <PresetList
        presets={presets}
        onPresetSelect={onPresetSelect}
        onDeletePreset={onDeletePreset}
        closeAllPopups={closeAllPopups}
      />
    </section>
  );
};

export default PresetListPopup;
