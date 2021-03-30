class Api {
  constructor() {
    this._arduinoUrl = "http://192.168.25.143";
    this._serverUrl = "http://192.168.25.39:5000/";
  }

  _handleOriginalResponse(result) {
    if (!result.ok) {
      return Promise.reject(`Ошибка: ${result.status}`);
    }
    return result;
  }

  runConveyor() {
    return fetch(this._arduinoUrl + "/run", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this._handleOriginalResponse)
      .then((data) => data.json());
  }

  stopConveyor() {
    return fetch(this._arduinoUrl + "/stop", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this._handleOriginalResponse)
      .then((data) => data.json());
  }

  //   checkState() {
  //     return fetch(this._arduinoUrl + "/check", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then(this._handleOriginalResponse)
  //       .then((data) => data.json());
  //   }

  //   setTime({ stopTime, runTime }) {
  //     return fetch(this._serverUrl + "/set-time", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         stopTime,
  //         runTime,
  //       }),
  //     })
  //       .then(this._handleOriginalResponse)
  //       .then((data) => data.json());
  //   }
}

const api = new Api();

export default api;
