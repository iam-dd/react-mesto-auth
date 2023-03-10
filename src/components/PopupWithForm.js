import React from "react";

function PopupWithForm({isOpen, onClose, name, title, children, onSubmit, buttonText}) {
  return (
    <section
      className={`popup popup_section_${name} ${
        isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__button-close popup__button-close_section_profile"
          type="button"
          onClick={onClose}
        />
        <form
          className={`popup__form popup__form_section_${name}`}
          name={name}
          onSubmit={onSubmit}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__button-submit" type="submit">
          {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
