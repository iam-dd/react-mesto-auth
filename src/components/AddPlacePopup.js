import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onSubmit, isOpen, onClose, isLoading }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="elements"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
    >
      <input
        id="title-input"
        className="popup__input popup__input_field_title"
        type="text"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={name || ""}
        onChange={handleChangeName}
      />
      <span className="title-input-error popup__input-error"></span>
      <input
        id="url-input"
        className="popup__input popup__input_field_link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={link || ""}
        onChange={handleChangeLink}
      />
      <span className="url-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
