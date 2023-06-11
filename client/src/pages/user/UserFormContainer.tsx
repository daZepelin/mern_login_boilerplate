import { Box, Slide } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LoggedInUserCtx } from "../../context/LoggedInUserCtx";

const UserFormContainer = () => {
  const { loggedInUser } = useContext(LoggedInUserCtx);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setOpen(false);
    if (loggedInUser) return;
    setTimeout(() => {
      setOpen(true);
    }, 170);
    return () => {};
  }, [loggedInUser, location]);

  useEffect(() => {
    if (loggedInUser) {
      setOpen(false);
      navigate("/");
    }
  }, [loggedInUser, navigate]);

  return (
    <Slide in={open} direction="up">
      <div
        style={{
          width: "100%",
          height: "80vh",
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
    </Slide>
  );
};

export default UserFormContainer;
