import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isLoading, isOpen, onClose, onUpdateAvatar }) {
  const avatarUrl = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarUrl.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar-load"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading? 'Сохранение...' : 'Сохранить'}
    >
      <input
        id="url-input-avatar"
        className="popup__input popup__input_field_link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        ref={avatarUrl}
      />
      <span className="url-input-avatar-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
