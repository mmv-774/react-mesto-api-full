import { apiOptions } from './constants.js';

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _sendRequest(path, options) {
    return fetch(`${this._baseUrl}${path}`, options).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUserInfo() {
    return this._sendRequest('users/me', {
      headers: this._headers,
    });
  }

  getCards() {
    return this._sendRequest('cards', {
      headers: this._headers,
    });
  }

  patchUserInfo({ name, about }) {
    return this._sendRequest('users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  postNewCard({ name, link }) {
    return this._sendRequest('cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  deleteCard(cardId) {
    return this._sendRequest(`cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  patchAvatar(avatar) {
    return this._sendRequest(`users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }

  setLike(cardId, isLiked) {
    const method = isLiked ? 'DELETE' : 'PUT';
    return this._sendRequest(`cards/${cardId}/likes`, {
      method: method,
      headers: this._headers,
    });
  }
}

export const api = new Api(apiOptions);
