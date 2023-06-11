import React, { useContext, useState } from "react";
import { LoggedInUserCtx } from "../../../context/LoggedInUserCtx";
import { fetchApi } from "../../../utils/fetch";
import { ILoggedInUser } from "../../../typings/user";
import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import PasswordField from "../../../components/PasswordField";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { setLoggedInUser } = useContext(LoggedInUserCtx);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchApi({
      path: "/api/users/signup",
      method: "POST",
      body: formData,
    }).then(({ data }: { data: { user: ILoggedInUser } }) => {
      if (data) {
        setLoggedInUser(data.user);
      }
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          gap: "7px",
        }}
      >
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="register-username">Username</InputLabel>
          <Input
            id="register-username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            type="username"
            required
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="register-email">Email</InputLabel>
          <Input
            id="register-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            required
          />
        </FormControl>
        <PasswordField
          label="Password"
          name="password"
          value={formData.password}
          id="register-password"
          handleChange={handleChange}
        />
        <PasswordField
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          id="register-confirm-password"
          handleChange={handleChange}
        />
        <Box
          sx={{
            fontSize: "x-small",
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box component={"span"}>Already have an account?</Box>
          <Button size="small" onClick={() => navigate("/login")}>
            Log In
          </Button>
        </Box>
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default Register;
