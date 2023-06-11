import App from "./App";
import LoggedInUserProvider from "../providers/LoggedInUserProvider";
import RouterProvider from "../providers/RouterProvider";

const Providers = () => {
  return (
    <LoggedInUserProvider>
      <RouterProvider>
        <App />
      </RouterProvider>
    </LoggedInUserProvider>
  );
};

export default Providers;
