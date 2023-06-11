import { createContext } from "react";
import { ILoggedInUser } from "../typings/user";

export interface ILoggedInUserCtx {
  loggedInUser?: ILoggedInUser;
  setLoggedInUser: (loggedInUser?: ILoggedInUser) => void;
}

export const LoggedInUserCtx = createContext<ILoggedInUserCtx>({
  loggedInUser: undefined,
  setLoggedInUser: () => {},
});
