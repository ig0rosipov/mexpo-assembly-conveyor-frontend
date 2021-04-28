import "./App.css";
import Main from "../Main/Main";
import Preloader from "../Preloader/Preloader";
import { SocketContext } from "../../context/socket";
import { useContext, useState, useEffect } from "react";
import mainApi from "../../utils/mainApi";
const App = () => {
  const socket = useContext(SocketContext);
  const [presets, setPresets] = useState([]);
  const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);

  useEffect(() => {
    mainApi
      .getAllPresets()
      .then((presets) => {
        setPresets(presets);
        setIsInitialDataLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="app">
      {isInitialDataLoaded ? (
        <Main socket={socket} presets={presets} setPresets={setPresets} />
      ) : (
        <Preloader />
      )}
    </div>
  );
};

export default App;
