import "./App.css";
import NavBar from "./navbar/NavBar";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/user/login/Login";
import Register from "../pages/user/register/Register";
import UserFormContainer from "../pages/user/UserFormContainer";
import { Typography } from "@mui/material";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <Typography variant="h2" sx={{ color: "primary.dark" }}>
              Home
            </Typography>
          }
        ></Route>
        <Route element={<UserFormContainer />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
