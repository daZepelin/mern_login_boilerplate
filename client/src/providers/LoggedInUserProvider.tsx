import React, { useState } from "react";
import { ILoggedInUser } from "../typings/user";
import { LoggedInUserCtx } from "../context/LoggedInUserCtx";

const LoggedInUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedInUser, setLoggedInUser] = useState<ILoggedInUser>();

  return (
    <LoggedInUserCtx.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </LoggedInUserCtx.Provider>
  );
};

export default LoggedInUserProvider;
