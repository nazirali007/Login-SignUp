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
      sx={{
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${SignUpImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 425,
          padding: 4,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontSize: { xs: "1.8rem", sm: "2rem", md: "2.5rem" },
            textAlign: "center",
          }}
        >
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!error.name}
            helperText={error.name}
            sx={{ mb: 2, filter: "none" }}
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
            sx={{ mb: 2, filter: "none" }}
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
            sx={{ mb: 2, filter: "none" }}
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
            sx={{ mb: 2, filter: "none" }}
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
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              padding: "10px",
              mt: 2,
              backgroundColor: "#088076",
              "&:hover": {
                backgroundColor: "#06635A",
              },
            }}
          >
            Sign Up
          </Button>
        </form>
        <Box mt={2}>
          <Typography>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{
                color: "#4cb5ad",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Login
            </span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
