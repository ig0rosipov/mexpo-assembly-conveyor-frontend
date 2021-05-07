import "./CreatePresetPopup.css";
import { useState } from "react";

const CreatePresetPopup = ({
  isCreatePresetPopupOpened,
  closeAllPopups,
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
          closeAllPopups();
          setButtonText("Сохранить");
          setPresetName({
            value: "",
            isValid: false,
            validationMessage: "",
          });
        }, 1500);
      })
      .catch(() => {
        setButtonText("Ошибка");
        setTimeout(() => {
          setButtonText("Сохранить");
        }, 1500);
      });
  };

  const handleInput = (e) => {
    setPresetName({
      value: e.target.value,
      isValid: e.target.validity.valid,
      validationMessage: e.target.validationMessage,
    });
  };

  const onOverlayClick = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    closeAllPopups();
  };

  return (
    <section
      className={`create-preset-popup popup ${
        !isCreatePresetPopupOpened && "popup_hidden"
      }`}
      onClick={onOverlayClick}
    >
      <form
        className="create-preset-popup__form"
        onSubmit={onSubmit}
        noValidate
      >
        <div
          className="create-preset-popup__close-button close-button"
          onClick={closeAllPopups}
        ></div>
        <p className="create-preset-popup__heading">Введите название пресета</p>
        <input
          className={`create-preset-popup__input ${
            !presetName.isValid && "create-preset-popup__input_type_error"
          }`}
          placeholder="Название"
          onChange={handleInput}
          value={presetName.value}
          minLength="2"
          required
          type="text"
        />
        <span
          className={`create-preset-popup__validation-error ${
            presetName.isValid && "create-preset-popup__validation-error_hidden"
          }`}
        >
          {presetName.validationMessage}
        </span>
        <button
          className={`create-preset-popup__submit-button ${
            !presetName.isValid && "create-preset-popup__submit-button_disabled"
          }`}
          disabled={!presetName.isValid}
        >
          {buttonText}
        </button>
      </form>
    </section>
  );
};

export default CreatePresetPopup;
