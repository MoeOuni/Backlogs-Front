import logo from "./logo.svg";
import "./App.css";

import Backlog from "./Pages/Backlog";
import Sprint from "./Pages/Sprint";
import AppContext from "./contexts/AppContext";

function App() {
  return (
    <AppContext>
      <Backlog />
      <Sprint />
    </AppContext>
  );
}

export default App;
