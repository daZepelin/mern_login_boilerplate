import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  Alert,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { LoggedInUserCtx } from "../../../context/LoggedInUserCtx";
import { fetchApi } from "../../../utils/fetch";
import { ILoggedInUser } from "../../../typings/user";
import PasswordField from "../../../components/PasswordField";

const Register = () => {
  const { setLoggedInUser } = useContext(LoggedInUserCtx);
  const [error, setError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [passwordConfirmError, setPasswordConfirmError] = useState<
    string | undefined
  >();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "confirmPassword") {
      if (e.target.value !== formData.password) {
        setPasswordConfirmError("Passwords do not match");
      } else {
        setPasswordConfirmError(undefined);
      }
    } else if (e.target.name === "password") {
      if (e.target.value.length < 8) {
        setPasswordError("Password must be at least 8 characters long");
      } else {
        setPasswordError(undefined);
      }
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    fetchApi({
      path: "/api/users/signup",
      method: "POST",
      body: formData,
    }).then(
      ({
        data,
      }: {
        data: { user: ILoggedInUser; error: string };
        resp: Response;
      }) => {
        if (data) {
          setLoggedInUser(data.user);
          if (data.error) {
            setError(data.error);
          }
        }
      }
    );
  };

  return (
    <div>
      {error && (
        <Alert sx={{ maxWidth: "220px", alignItems: 'center' }} severity="error">
          {error}
        </Alert>
      )}
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
          error={passwordError}
          handleChange={handleChange}
        />
        <PasswordField
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          id="register-confirm-password"
          error={passwordConfirmError}
          handleChange={handleChange}
        />
        <Button variant="contained" fullWidth type="submit">
          Register
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
        <Box component={"span"}>Already have an account?</Box>
        <Button size="small" onClick={() => navigate("/login")}>
          Log In
        </Button>
      </Box>
    </div>
  );
};

export default Register;
