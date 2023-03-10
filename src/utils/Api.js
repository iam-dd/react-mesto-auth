import { API_OPTIONS } from "./constants.js";

export class Api {
  constructor(options) {
    this._url = options.url;
    this._header = options.headers;
    this._body = options.body;
  }

  // Получаем начальный массив карточек с сервера
  async getInitialCards() {
    const res = await fetch(`${this._url}/cards`, {
      headers: this._header,
    });
    return this._getResponse(res);
  }

  // Создаем карточку на сервере
  async createCard({ name, link }) {
    const res = await fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._header,
      body: JSON.stringify({ name, link }),
    });
    return this._getResponse(res);
  }

  // Удаляем карточку на сервере
  async deleteCard(id) {
    const res = await fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._header,
    });
    return this._getResponse(res);
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async setUserAvatar(avatar) {
    const res = await fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({ avatar }),
    });
    return this._getResponse(res);
  }

  // Передаём данные о пользователе
  async setUserInfo(userData) {
    const res = await fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    });
    {
      return this._getResponse(res);
    }
  }

  // Получаем данные о пользователе
  async getUserInfo() {
    const res = await fetch(`${this._url}/users/me`, {
      headers: this._header,
    });
    {
      return this._getResponse(res).then((data) => {
        return data;
      });
    }
  }

  // Меняем состояние лайка

  async changeLikeCardStatus(id, isLiked) {
    const res = await fetch(`${this._url}/cards/likes/${id}`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._header,
    });
    {
      return this._getResponse(res);
    }
  }
}

export const api = new Api(API_OPTIONS);
