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
        bgcolor: 'primary.light',
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%",
        height: "50px",
        boxSizing: "border-box",
        gap: 3,
        pl: 3,
        pr: 3,
      }}
    >
      <Box>{loggedInUser && `Logged in as ${loggedInUser?.username}`}</Box>
      {loggedInUser ? (
        <Button
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
          <Button onClick={() => navigate("/login")}>Log In</Button>
          <Button onClick={() => navigate("/register")}>Register</Button>
        </Box>
      )}
    </Box>
  );
};

export default NavBar;
