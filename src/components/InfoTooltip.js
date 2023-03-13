import React from "react";
import errorImage from "../images/error.svg";
import "../blocks/infoToolTip/infoToolTip.css";
import regOk from "../images/regok.svg";

function InfoToolTip({ textMessage, isOpen, onClose, name, toolTipType }) {
  return (
    <section
      className={`popup popup_section_${name} ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container infoToolTip">
        <button
          className="popup__button-close popup__button-close_section_profile"
          type="button"
          onClick={onClose}
        />

        <img
          src={toolTipType ? regOk : errorImage}
          alt={toolTipType ? "Успешная регистрация" : "Ошибка регистрации"}
        />
        <p className="infoToolTip__message">{textMessage}</p>
      </div>
    </section>
  );
}

export default InfoToolTip;
