const authOptions = {
  // baseUrl: 'https://auth.nomoreparties.co',
  // baseUrl: 'http://localhost:3000',
  baseUrl: 'https://api.tomson.students.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json',
  }
};

class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Проверяем статус ответа сервера:
  _checkResponseStatus(response, method) {
    return response.ok ? response.json() : Promise.reject(`Ошибка в ${method}: ${response.status}`)
  }

  signup(userData) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(userData)
    })
      .then(res => {
        return this._checkResponseStatus(res, 'signup')
      })
  }

  signin(userData) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(userData)
    })
      .then(res => {
        return this._checkResponseStatus(res, 'signin')
      })
  }

  reEnter() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
      .then(res => {
        return this._checkResponseStatus(res, 'reEnter')
      })
  }

  logoutUser() {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => {
        return this._checkResponseStatus(res, 'logoutUser')
      })
  }
}

const auth = new Auth(authOptions);

export default auth;
