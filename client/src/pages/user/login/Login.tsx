import React, { useContext, useState } from "react";
import { LoggedInUserCtx } from "../../../context/LoggedInUserCtx";
import { ILoggedInUser } from "../../../typings/user";
import { fetchApi } from "../../../utils/fetch";
import PasswordField from "../../../components/PasswordField";
import { FormControl, InputLabel, Input, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setLoggedInUser } = useContext(LoggedInUserCtx);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchApi({
      path: "/api/users/login",
      method: "POST",
      body: formData,
    }).then(({ data }: { data: { user?: ILoggedInUser; error?: string } }) => {
      if (data) {
        setLoggedInUser(data.user);
      }
    });
  };

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          gap: "7px",
        }}
        onSubmit={handleSubmit}
      >
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="login-username">Username</InputLabel>
          <Input
            id="login-username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            type="username"
            required
          />
        </FormControl>
        <PasswordField
          label="Password"
          name="password"
          id="login-password"
          value={formData.password}
          handleChange={handleChange}
        />
        <Button variant="contained" fullWidth type="submit">
          Log In
        </Button>
      </form>
      <Box
        sx={{
          fontSize: "x-small",
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
          mt: 1,
        }}
      >
        <Box component={"span"}>Need an account?</Box>
        <Button size="small" onClick={() => navigate("/register")}>
          Register
        </Button>
      </Box>
    </div>
  );
};

export default Login;
