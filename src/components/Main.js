import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile page__profile">
        <div className="profile__person">
          <div className="avatarButtonContainer">
            <button
              type="button"
              className="profile__avatar-button"
              onClick={props.onEditAvatar}
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
            ></button>
          </div>
          <div className="profile__block-name">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={props.onEditProfile}
            ></button>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section
        className="elements page__elements"
        aria-label="Карточки с фотографиями"
      >
        {props.cards.map((element) => (
          <Card
            card={element}
            onCardClick={props.onCardClick}
            key={element._id}
            owner={element.owner._id}
            likes={element.likes}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
