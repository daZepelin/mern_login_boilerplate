import React, { useEffect, useState } from "react";
import { ILoggedInUser } from "../typings/user";
import { LoggedInUserCtx } from "../context/LoggedInUserCtx";
import { fetchApi } from "../utils/fetch";

const LoggedInUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedInUser, setLoggedInUser] = useState<ILoggedInUser>();

  useEffect(() => {
    return () => {
      fetchApi({
        path: "/api/users/getAuthUser",
        method: "GET",
      }).then(({ data }: { data: { user: ILoggedInUser } }) => {
        if (data) {
          setLoggedInUser(data.user);
        }
      });
    };
  }, []);

  return (
    <LoggedInUserCtx.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </LoggedInUserCtx.Provider>
  );
};

export default LoggedInUserProvider;
