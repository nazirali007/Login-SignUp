import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SignUpImage from "../../public/images/signin-bg.jpg";
import { useNavigate } from "react-router-dom";
import "./style.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newError = {};
    let valid = true;

    // Validation checks
    if (!formData.name) {
      newError.name = "Name is required.";
      valid = false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newError.email = "Invalid email format.";
      valid = false;
    }
    if (formData.password.length < 8) {
      newError.password = "Password must be at least 8 characters long.";
      valid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newError.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    setError(newError);

    if (valid) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        localStorage.setItem("user", JSON.stringify(formData));
        alert("Signup successful!");
      } catch (error) {
        console.error("Error during signup:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Box
      className="signup-container"
      style={{
        backgroundImage: `url(${SignUpImage})`,
      }}
    >
      <Box className="signup-box">
        <Typography className="signup-title">Sign Up</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!error.name}
            helperText={error.name}
            className="signup-field"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!error.email}
            helperText={error.email}
            className="signup-field"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={passwordVisible ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            error={!!error.password}
            helperText={error.password}
            className="signup-field"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {passwordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type={confirmPasswordVisible ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!error.confirmPassword}
            helperText={error.confirmPassword}
            className="signup-field"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={toggleConfirmPasswordVisibility}
                    edge="end"
                  >
                    {confirmPasswordVisible ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" className="signup-button">
            Sign Up
          </Button>
        </form>
        <Box mt={2}>
          <Typography>
            Already have an account?{" "}
            <span className="login-link" onClick={() => navigate("/login")}>
              Login
            </span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
