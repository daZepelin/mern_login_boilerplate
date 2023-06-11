import React, { useContext, useState } from "react";
import { LoggedInUserCtx } from "../../context/LoggedInUserCtx";
import { fetchApi } from "../../utils/fetch";
import { ILoggedInUser } from "../../typings/user";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import PasswordField from "../../components/PasswordField";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserCtx);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchApi({
      path: "/api/users/signup",
      method: "POST",
      body: formData,
    }).then((res: ILoggedInUser) => {
      console.log(res);
      if (res) {
        setLoggedInUser(res);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center",
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
      <Button type="submit">Register</Button>
    </form>
  );
};

export default Register;
