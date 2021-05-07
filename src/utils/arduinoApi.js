import { config } from "../configs/config";

class ArduinoApi {
  constructor() {
    this._arduinoUrl = config.arduinoUrl;
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

  pause() {
    return fetch(this._arduinoUrl + "/pause", {
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
