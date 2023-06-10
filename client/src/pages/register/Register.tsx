import React, { useContext, useState } from "react";
import { LoggedInUserCtx } from "../../context/LoggedInUserCtx";
import { fetchApi } from "../../utils/fetch";
import { ILoggedInUser } from "../../typings/user";

const Register = () => {
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserCtx);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        name="username"
        type="text"
        placeholder="username"
      />
      <input
        onChange={handleChange}
        name="email"
        type="email"
        placeholder="email"
      />
      <input
        onChange={handleChange}
        name="password"
        type="password"
        placeholder="password"
      />
      <input
        onChange={handleChange}
        name="password"
        type="password"
        placeholder="confirm password"
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
