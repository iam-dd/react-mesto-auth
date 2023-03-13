import React from "react";
import logo from "../images/logo.svg";
import { Link, Routes, Route } from "react-router-dom";
import "../blocks/auth/auth.css";

function Header({ loggedIn, userEmail, handleSignOut }) {
  return (
    <header className="header page__header">
      <img className="logo" src={logo} alt="логотип" />
      <div className="auth__block">
        {loggedIn ? <p className="auth__enter">{userEmail}</p> : ""}
        <Routes>
          <Route
            path="/"
            element={
              <Link
                to="/sign-in"
                onClick={handleSignOut}
                className="auth__enter"
              >
                Выйти
              </Link>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="auth__enter">
                Войти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="auth__enter">
                Регистрация
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
