import React from "react";
import "../blocks/auth/auth.css";
import { Link } from "react-router-dom";

function Register({ onSubmit }) {
  const [inputsValue, setInputsValue] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setInputsValue({
      ...inputsValue,
      [name]: value,
    });
  }

  function handleSubmit() {
    onSubmit(inputsValue);
  }

  return (
    <div className="auth">
      <h1 className="auth__title">Регистрация</h1>
      <form className="auth__form">
        <input
          className="auth__input"
          name="email"
          type="email"
          required
          placeholder="Email"
          onChange={handleChange}
          
        />
        <input
          className="auth__input"
          name="password"
          type="password"
          required
          placeholder="Пароль"
          onChange={handleChange}
        />
      </form>
      <button className="auth__button" onClick={handleSubmit}>
        Зарегистрироваться
      </button>
      <Link to="/sign-in" className="auth__link">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
