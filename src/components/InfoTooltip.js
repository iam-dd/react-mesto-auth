import React from "react";
import errorImage from "../images/error.svg";
import "../blocks/infoToolTip/infoToolTip.css";
import regOk from "../images/regok.svg";

function InfoToolTip({ onClose, name, toolTipType }) {
  return (
    <section
      className={`popup popup_section_${name} ${
        toolTipType.open ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container infoToolTip">
        <button
          className="popup__button-close popup__button-close_section_profile"
          type="button"
          onClick={onClose}
        />

        <img
          src={toolTipType.status ? regOk : errorImage}
          alt={toolTipType.text}
        />
        <p className="infoToolTip__message">{toolTipType.text}</p>
      </div>
    </section>
  );
}

export default InfoToolTip;
