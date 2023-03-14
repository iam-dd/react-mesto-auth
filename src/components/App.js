import { React, useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../../src/contexts/CurrentUserContext";
import { api } from "../utils/Api";
import { auth } from "../utils/Auth";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoToolTip from "./InfoTooltip";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toolTipType, setToolTipType] = useState({
    status: false,
    text: "",
    open: false,
  });

  const isOpen =
    toolTipType.open ||
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard.link;

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialCards(), api.getUserInfo()])
        .then(([cards, userData]) => {
          setCards(cards);
          setCurrentUser(userData);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setToolTipType({ status: false, open: false, text: "" });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .createCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleRegister({ email, password }) {
    auth
      .registration({ email, password })
      .then((res) => {
        setToolTipType({
          status: true,
          open: true,
          text: "Вы успешно зарегистрировались!",
        });
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setToolTipType({
          status: false,
          open: true,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      });
  }

  function handleLogin({ email, password }) {
    auth
      .login({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        setToolTipType({
          status: false,
          open: true,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    jwt
      ? auth
          .checkToken(jwt)
          .then((res) => setUserEmail(res.data.email))
          .then(setLoggedIn(true))
          .catch((err) => console.log(err))
      : setLoggedIn(false);
  }, [userEmail, loggedIn]);

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  function handleUpdateUser(userData) {
    setIsLoading(true);
    api
      .setUserInfo(userData)
      .then(setIsLoading(true))
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        setIsLoading(false);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .setUserAvatar(data.avatar)
      .then(setIsLoading(true))
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        setIsLoading(false);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        loggedIn={loggedIn}
        userEmail={userEmail}
        handleSignOut={handleSignOut}
      />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              loggedIn={loggedIn}
              element={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />
          }
        />

        <Route
          path="/sign-up"
          element={
            loggedIn ? (
              <Navigate to="/" />
            ) : (
              <Register onSubmit={handleRegister} />
            )
          }
        />
        <Route
          path="/sign-in"
          element={
            loggedIn ? <Navigate to="/" /> : <Login onSubmit={handleLogin} />
          }
        />
      </Routes>
      <Footer />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleAddPlaceSubmit}
        isLoading={isLoading}
      />

      <InfoToolTip onClose={closeAllPopups} toolTipType={toolTipType} />

      <PopupWithForm name="confirmation" title="Вы уверены ?" />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
