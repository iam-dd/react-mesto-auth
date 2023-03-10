import React from "react";

function ImagePopup(props) {
  return (
    <section
      className={`popup popup_section_image ${
        props.card.link ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__button-close popup__button-close_section_image"
          type="button"
          onClick={props.onClose}
        />
        <div
          className="popup__image"
          style={{ backgroundImage: `url(${props.card.link})` }}
        />
        <h2 className="popup__title-image">{props.card.name}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;
