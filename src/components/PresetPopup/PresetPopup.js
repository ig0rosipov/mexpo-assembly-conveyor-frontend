import "./PresetPopup.css";
import { useState } from "react";

const PresetPopup = ({
  isPresetPopupOpened,
  setIsPresetPopupOpened,
  onPresetPopupSubmit,
  setPresets,
  presets,
}) => {
  const [presetName, setPresetName] = useState({
    value: "",
    isValid: false,
    validationMessage: "",
  });
  const [buttonText, setButtonText] = useState("Сохранить");

  const onSubmit = (e) => {
    e.preventDefault();
    setButtonText("Сохранение...");
    onPresetPopupSubmit(presetName.value)
      .then((data) => {
        setButtonText("Успешно!");
        setPresets([...presets, data]);
        setTimeout(() => {
          setIsPresetPopupOpened(false);
          setButtonText("Сохранить");
        }, 1500);
      })
      .catch(() => {
        setButtonText("Ошибка");
        setTimeout(() => {
          setButtonText("Сохранить");
        }, 1500);
      });
  };

  const onOverlayClick = (e) => {
    if (e.currentTarget !== e.target) {
      return;
    }
    setIsPresetPopupOpened(false);
  };

  const onCloseButton = () => {
    setIsPresetPopupOpened(false);
  };

  const handleInput = (e) => {
    setPresetName({
      value: e.target.value,
      isValid: e.target.validity.valid,
      validationMessage: e.target.validationMessage,
    });
  };

  return (
    <section
      className={`preset-popup ${
        !isPresetPopupOpened && "preset-popup_hidden"
      }`}
      onClick={onOverlayClick}
    >
      <form className="preset-popup__form" onSubmit={onSubmit} noValidate>
        <div
          className="preset-popup__close-button"
          onClick={onCloseButton}
        ></div>
        <p className="preset-popup__heading">Введите название пресета</p>
        <input
          className={`preset-popup__input ${
            !presetName.isValid && "preset-popup__input_type_error"
          }`}
          placeholder="Название"
          onChange={handleInput}
          value={presetName.value}
          minLength="2"
          required
          type="text"
        />
        <span
          className={`preset-popup__validation-error ${
            presetName.isValid && "preset-popup__validation-error_hidden"
          }`}
        >
          {presetName.validationMessage}
        </span>
        <button
          className={`preset-popup__submit-button ${
            !presetName.isValid && "preset-popup__submit-button_disabled"
          }`}
          disabled={!presetName.isValid}
        >
          {buttonText}
        </button>
      </form>
    </section>
  );
};

export default PresetPopup;
