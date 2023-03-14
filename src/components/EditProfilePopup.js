import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
    >
      <input
        id="name-input"
        className="popup__input popup__input_field_name"
        type="text"
        name="name"
        required
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={handleChangeName}
      />
      <span className="name-input-error popup__input-error"></span>
      <input
        id="about-input"
        className="popup__input popup__input_field_about"
        type="text"
        name="about"
        required
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={handleChangeDescription}
      />
      <span className="about-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
