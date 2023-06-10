import App from "./App";
import LoggedInUserProvider from "../providers/LoggedInUserProvider";

const Providers = () => {
  return (
    <LoggedInUserProvider>
      <App />
    </LoggedInUserProvider>
  );
};

export default Providers;
