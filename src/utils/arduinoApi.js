class ArduinoApi {
  constructor() {
    this._arduinoUrl = "http://192.168.13.116";
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
}

const arduinoApi = new ArduinoApi();

export default arduinoApi;
