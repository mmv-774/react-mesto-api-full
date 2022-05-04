export const BASE_URL = 'https://auth.nomoreparties.co';

function _sendAuthRequest(email, password, endpoint) {
  return fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => _handleResponse(response));
}

function _handleResponse(response) {
  const result = response.json();
  if (response.ok) {
    return result;
  }
  return result.then((res) => Promise.reject(res.message || res.error || 'Что-то пошло не так! Попробуйте еще раз.'));
}

export const register = (email, password) => {
  return _sendAuthRequest(email, password, '/signup');
};

export const authorize = (email, password) => {
  return _sendAuthRequest(email, password, '/signin');
};

export const tokenCheck = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => _handleResponse(response));
};
