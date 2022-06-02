import { useSelector } from "react-redux";
import { usernameSelector } from "./redux/store";

import NamePanel from "./components/NamePanel/NamePanel";
import ChatPanel from "./components/ChatPanel/ChatPanel";

import "./App.css";

function App() {
  const username = useSelector(usernameSelector);

  return (
    <div className="app">
      {username ? <ChatPanel /> : <NamePanel />}
    </div>
  );
}

export default App;
