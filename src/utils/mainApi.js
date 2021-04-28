import { config } from "../configs/config";

class MainApi {
  constructor() {
    this._baseUrl = config.mainApi;
  }

  _handleResponse(res) {
    return res.json().then((json) => {
      if (!res.ok) {
        throw json;
      } else {
        return json;
      }
    });
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
      body: JSON.stringify({
        name,
        runTime,
        stopTime,
      }),
    }).then(this._handleResponse);
  }

  deletePreset(presetId) {
    return fetch(this._baseUrl + "/presets/" + presetId, {
      method: "DELETE",
    }).then(this._handleResponse);
  }
}

const mainApi = new MainApi();

export default mainApi;
