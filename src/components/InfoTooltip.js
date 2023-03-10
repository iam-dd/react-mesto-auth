import React from "react";
import errorImage from "../images/error.svg";
import "../blocks/infoToolTip/infoToolTip.css";
import regOk from "../images/regok.svg";

function InfoToolTip({ isOpen, onClose, name, toolTipType }) {
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
        {toolTipType ? (
          <>
            <img src={regOk} alt="Успешная регистрация" />
            <p className="infoToolTip__message">
              Вы успешно зарегистрировались!
            </p>
          </>
        ) : (
          <>
            <img src={errorImage} alt="Ошибка регистрации" />
            <p className="infoToolTip__message">
              Что-то пошло не так! Попробуйте ещё раз.
            </p>
          </>
        )}
      </div>
    </section>
  );
}

export default InfoToolTip;
