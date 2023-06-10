import { useContext } from "react";
import "./App.css";
import { LoggedInUserCtx } from "../context/LoggedInUserCtx";
import Register from "../pages/register/Register";

function App() {
  const { loggedInUser } = useContext(LoggedInUserCtx);
  return (
    <div className="App">
      <div>{loggedInUser?.username}</div>
      <Register />
    </div>
  );
}

export default App;
