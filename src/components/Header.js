import React from "react";
import logo from "../images/logo.svg";
import { Link } from 'react-router-dom'
import '../blocks/auth/auth.css'

function Header({ loggedIn, userEmail, handleSignOut }) {

 // const [textButton, setTextButton] = React.useState('Регистрация')
 
  return (
    <header className="header page__header">
      <img className="logo" src={logo} alt="логотип" />
      {loggedIn ? <div className="auth__block"><p className="auth__email">{ userEmail }</p><button type="button" className="auth__enter" onClick={handleSignOut}>Выйти</button></div> : <Link to="/sign-up" className="auth__enter">Регистрация</Link>}
    </header>
  );
}

export default Header;
