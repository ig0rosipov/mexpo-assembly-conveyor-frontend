class Api {
  constructor() {
    this._baseUrl = "http://192.168.25.145";
  }

  _handleOriginalResponse(result) {
    if (!result.ok) {
      return Promise.reject(`Ошибка: ${result.status}`);
    }
    return result;
  }

  runConveyor() {
    return fetch(this._baseUrl + "/run", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this._handleOriginalResponse)
      .then((data) => data.json());
  }

  stopConveyor() {
    return fetch(this._baseUrl + "/stop", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this._handleOriginalResponse)
      .then((data) => data.json());
  }

  checkState() {
    return fetch(this._baseUrl + "/check", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this._handleOriginalResponse)
      .then((data) => data.json());
  }
}

const api = new Api();

export default api;
