import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import React, { useState } from "react";

interface IProps {
  label: string;
  name: string;
  value: string;
  id: string;
  error?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordField = ({ label, name, value, id, error, handleChange }: IProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <FormControl
      error={error != null}
      sx={{ m: 1, width: "25ch" }}
      variant="standard"
      fullWidth
    >
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
      <FormHelperText id="password-helper-text">
        {error}
      </FormHelperText>
    </FormControl>
  );
};

export default PasswordField;
