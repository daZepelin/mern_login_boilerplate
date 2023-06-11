import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const UserFormContainer = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          background: "rgba(0,0,0,0.1)",
          maxWidth: "500px",
          p: 3,
          height: "fit-content",
          borderRadius: "17px",
        }}
      >
        <Outlet />
      </Box>
    </div>
  );
};

export default UserFormContainer;
