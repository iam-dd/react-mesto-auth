import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.owner === currentUser._id;
  const isLiked = props.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like ${
    isLiked && "card__like_state_active"
  }`;

  return (
    <div className="card">
      {isOwn && <button className="card__trash" onClick={handleDeleteClick} />}

      <img
        className="card__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="card__sign">
        <h2 className="card__location">{props.card.name}</h2>
        <div className="card__block-like">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <span className="card__amount-oflike">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
