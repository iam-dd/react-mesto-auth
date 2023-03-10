import { AUTH_OPTIONS } from "./constants";

class Auth {
  constructor(options) {
    this._url = options.url;
    this._header = options.header;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async registration(data) {
    const res = await fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._header,
      body: JSON.stringify(data),
    });

    return this._getResponse(res);
  }

  async login(data) {
    const res = await fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._header,
      body: JSON.stringify(data),
    });

    return this._getResponse(res);
  }

  async checkToken(jwt) {
    const res = await fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`,
      },
    });
    return this._getResponse(res);
  }
}

export const auth = new Auth(AUTH_OPTIONS);
