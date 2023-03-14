import React from "react";
import "../blocks/auth/auth.css";

function Login({ onSubmit }) {
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

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(inputsValue);
  }

  return (
    <div className="auth">
      <h1 className="auth__title">Вход</h1>
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
          minLength="5"
        />
        <button className="auth__button" type="submit" onClick={handleSubmit}>
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
