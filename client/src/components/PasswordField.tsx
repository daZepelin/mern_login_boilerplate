import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";

interface IProps {
  label: string;
  name: string;
  value: string;
  id: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordField = ({ label, name, value, id, handleChange }: IProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  
  return (
    <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={handleChange}
        required
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleShowPassword}
              onMouseDown={(e) => e.preventDefault()}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default PasswordField;
