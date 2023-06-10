import React, { useContext } from "react";
import { LoggedInUserCtx } from "../../context/LoggedInUserCtx";

const Login = () => {
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserCtx);

  return <div>Login</div>;
};

export default Login;
