import React, { useContext } from "react";
import { LoggedInUserCtx } from "../../context/LoggedInUserCtx";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "../../utils/fetch";

const NavBar = () => {
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserCtx);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        bgcolor: "primary.light",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%",
        height: "70px",
        boxSizing: "border-box",
        gap: 3,
        pl: 3,
        pr: 3,
      }}
    >
      <Box>{loggedInUser && `Logged in as ${loggedInUser?.username}`}</Box>
      {loggedInUser ? (
        <Button
          sx={{
            color: "white",
          }}
          variant="contained"
          onClick={() => {
            fetchApi({ path: "/api/users/logout", method: "POST" }).then(() => {
              navigate("/");
              setLoggedInUser(undefined);
            });
          }}
        >
          Log Out
        </Button>
      ) : (
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            sx={{ color: "white" }}
            onClick={() => navigate("/login")}
          >
            Log In
          </Button>
          <Button
            variant="contained"
            sx={{ color: "white" }}
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default NavBar;
