import { apiOptions } from './constants.js';

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _setHeaders() {
    const jwt = localStorage.getItem('jwt');
    return {
      Authorization: `Bearer ${jwt}`,
      ...this._headers,
    };
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
    return this._sendRequest('/users/me', {
      headers: this._setHeaders(),
    });
  }

  getCards() {
    return this._sendRequest('/cards', {
      headers: this._setHeaders(),
    });
  }

  patchUserInfo({ name, about }) {
    return this._sendRequest('/users/me', {
      method: 'PATCH',
      headers: this._setHeaders(),
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  postNewCard({ name, link }) {
    return this._sendRequest('/cards', {
      method: 'POST',
      headers: this._setHeaders(),
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  deleteCard(cardId) {
    return this._sendRequest(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._setHeaders(),
    });
  }

  patchAvatar(avatar) {
    return this._sendRequest(`/users/me/avatar`, {
      method: 'PATCH',
      headers: this._setHeaders(),
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }

  setLike(cardId, isLiked) {
    const method = isLiked ? 'DELETE' : 'PUT';
    return this._sendRequest(`/cards/${cardId}/likes`, {
      method: method,
      headers: this._setHeaders(),
    });
  }
}

export const api = new Api(apiOptions);
