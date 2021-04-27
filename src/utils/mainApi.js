import { config } from "../configs/config";

class MainApi {
  constructor() {
    this._baseUrl = config.mainApi;
  }

  _handleResponse(result) {
    if (!result.ok) {
      return Promise.reject(`Ошибка ${result.status}`);
    }
    return result.json();
  }

  getAllPresets() {
    return fetch(this._baseUrl + "/presets").then(this._handleResponse);
  }

  addPreset({ name, runTime, stopTime }) {
    return fetch(this._baseUrl + "/presets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        name,
        runTime,
        stopTime,
      },
    });
  }

  deletePreset({ presetId }) {
    return fetch(this._baseUrl + "/presets/" + presetId, {
      method: "DELETE",
    }).then(this._handleResponse);
  }
}

const mainApi = new MainApi();

export default mainApi;
